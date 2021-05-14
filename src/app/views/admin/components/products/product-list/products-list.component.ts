import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Product} from 'src/app/core/models/product.model';
import {ProductsService} from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})


export class ProductsListComponent implements AfterViewInit {
  products = [];
  displayedColumns: string[] = ['id', 'name', 'status', 'image', 'price', 'description', 'category_id','display_order','actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private productService: ProductsService, private router: Router, private snackBar: MatSnackBar) {
  
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  private getProducts() {
    this.productService.getAllProducts().subscribe((response: any) => {
           this.products = response.products;
           console.log(response);
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((response: any) => {
      if (response.status_code === 200) {
        this.snackBar.open('Producto eliminado', 'Cerrar', {duration: 5000});
        console.log(response);
      } else {
        this.snackBar.open(' No es posible eliminar este producto', 'Cerrar', {duration: 5000});
        console.log(response);
      }
    });
  }
}
