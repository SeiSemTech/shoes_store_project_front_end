import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductConfiguration } from 'src/app/core/models/product-configuration.model';
import { ProductConfigurationService } from 'src/app/core/services/productConfigurations/product-configuration.service';

@Component({
  selector: 'app-product-conf-list',
  templateUrl: './product-conf-list.component.html',
  styleUrls: ['./product-conf-list.component.scss']
})
export class ProductConfListComponent implements AfterViewInit {
  productConfigurations = [];
  displayedColumns: string[] = ['id', 'product_id', 'configuration_id', 'config_display_order', 'sub_config_display_order', 'stock', 'actions'];
  dataSource: MatTableDataSource<ProductConfiguration>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(
    private productConfigurationService: ProductConfigurationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit() {
    this.getProductConfigurations();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getProductConfigurations() {
    this.productConfigurationService.getAllProductConfigurations().subscribe((response: any) => {
      this.productConfigurations = response.product_configurations;
      this.dataSource = new MatTableDataSource(this.productConfigurations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteProductConfiguration(id: number) {
    this.productConfigurationService.deleteProductConfiguration(id).subscribe((response: any) => {
      this.snackBar.open('Configuración de producto sin stock', 'Cerrar', { duration: 5000 });
      const modifiedProductConfiguration = this.dataSource.data.find((productConfiguration: any) => {
        return productConfiguration.id === id;
      });
      modifiedProductConfiguration.stock = 0;
    }, (error) => {
      this.snackBar.open(' No es posible dejar sin stock la configuración de producto', 'Cerrar', { duration: 5000 });
    });
  }

}
