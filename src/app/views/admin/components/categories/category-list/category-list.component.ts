import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';

import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/categories/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements AfterViewInit {
  categories = [];
  displayedColumns: string[] = ['id', 'name', 'status', 'display_order', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  ngAfterViewInit() {
    this.getCategories();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private getCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response.categories;
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe((response: any) => {
      this.snackBar.open('Categoria desactivada', 'Cerrar', { duration: 5000 });
      const modifiedProduct = this.dataSource.data.find((product: any) => {
        return product.id === id;
      });
      modifiedProduct.status = 0;
    }, (error) => {
      this.snackBar.open(' No es posible desactivar esta categoria', 'Cerrar', { duration: 5000 });
    });
  }

}
