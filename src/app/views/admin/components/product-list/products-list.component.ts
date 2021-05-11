import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Product} from '../../../../core/models/product.model';
import {ProductsService} from '../../../../core/services/products/products.service';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})


export class ProductsListComponent implements AfterViewInit {
  products = [];
  displayedColumns: string[] = ['name', 'image', 'price', 'status', 'description', 'stockQuantity', 'categoryId', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private productService: ProductsService, private router: Router, private snackBar: MatSnackBar) {
    this.products = [
      {
        name: 'Zapato1', image: 'imagen', price: 2000, status: 1, description: 'Zapatos comodos', stockQuantity: 2, categoryId: 4
      },
      {
        name: 'Zapato2', image: 'imagen', price: 33000, status: 1, description: 'Zapatos melos', stockQuantity: 52, categoryId: 1
      },
      {
        name: 'Zapato3', image: 'imagen', price: 21443, status: 1, description: 'Zapatos feos', stockQuantity: 0, categoryId: 1
      },
      {
        name: 'Zapato4', image: 'imagen', price: 98421, status: 0, description: 'Zapatos incomodos', stockQuantity: 6, categoryId: 1
      },
      {
        name: 'Zapato5', image: 'imagen', price: 12000, status: 0, description: 'Zapatos incomodos y melos', stockQuantity: 12,
        categoryId: 1
      },
      {
        name: 'Zapato6', image: 'imagen', price: 143330, status: 1, description: 'Zapatos feos pero melis', stockQuantity: 21, categoryId: 1
      }


    ];
    this.dataSource = new MatTableDataSource(this.products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
