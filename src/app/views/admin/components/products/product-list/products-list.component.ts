import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { CategoryService } from 'src/app/core/services/categories/category.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})


export class ProductsListComponent implements AfterViewInit {
  products = [];
  categories = [];
  displayedColumns: string[] = ['id', 'name', 'status', 'image', 'price', 'description', 'category_id', 'display_order', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService
  ) {

  }


  ngAfterViewInit() {
    this.getProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//getcategoryname(id: number){
//  this.categoryService.getCategoryById(id).subscribe((response: any) =>{
//       this.categories = response.categories; 
//       console.log(this.categories.name);
//  });
//
//}

  private getProducts() {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.products = response.products;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((response: any) => {
      this.snackBar.open('Producto desactivado', 'Cerrar', { duration: 5000 });
      const modifiedProduct = this.dataSource.data.find((product: any) => {
        return product.id === id;
      });
      modifiedProduct.status = 0;
    }, (error) => {
      this.snackBar.open(' No es posible desactivar este producto', 'Cerrar', { duration: 5000 });
    });
  }
}
