import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../../../../core/services/products/products.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {

  activeCategories: any[] = [];
  public columns = ['name', 'description', 'price'];

  constructor(
    private productService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchCategories();
    console.log(this.activeCategories);
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

  fetchCategories() {
    this.productService.getEnabledProducts().subscribe((response: any) => {
      for (const category of response.categories) {
        this.activeCategories.push(category);
      }
    });
  }

  navigateToForm() {
    this.router.navigateByUrl("/products/add");
  }

}
