import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { Configuration } from 'src/app/core/models/configuration.model';
import { ConfigurationService } from 'src/app/core/services/configurations/configuration.service';

@Component({
  selector: 'app-configuration-list',
  templateUrl: './configuration-list.component.html',
  styleUrls: ['./configuration-list.component.scss']
})
export class ConfigurationListComponent implements AfterViewInit {
  configurations = [];
  displayedColumns: string[] = ['id', 'name', 'sub_configuration', 'extra_price', 'actions'];
  dataSource: MatTableDataSource<Configuration>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private configurationService: ConfigurationService,
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  ngAfterViewInit() {
    this.getConfigurations();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getConfigurations() {
    this.configurationService.getAllConfigurations().subscribe((response: any) => {
      this.configurations = response.configurations;
      this.dataSource = new MatTableDataSource(this.configurations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteConfiguration(id: number) {
    this.configurationService.deleteConfiguration(id).subscribe((response: any) => {
      this.snackBar.open('Configuración desactivada', 'Cerrar', { duration: 5000 });
      const modifiedConfiguration = this.dataSource.data.find((configuration: any) => {
        return configuration.id === id;
      });
      // modifiedConfiguration.status = 0;
    }, (error) => {
      this.snackBar.open(' No es posible desactivar esta configuración', 'Cerrar', { duration: 5000 });
    });
  }
}
