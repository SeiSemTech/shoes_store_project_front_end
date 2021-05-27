import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../core/models/product.model';
import { ProductsService } from '../../../../core/services/products/products.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {

  activeProducts: [];
  public columns = ['name', 'description', 'price',];

  constructor(
    private productService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.productService.getAllProducts().subscribe((response: any) => {
      console.log(response.products);
      this.activeProducts = response.products;
    });
  }

  navigateToForm() {
    this.router.navigateByUrl("/products/add");
  }

}
