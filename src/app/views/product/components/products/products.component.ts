import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from '../../../../core/services/products/products.service';
import {Category, Product, ProductCategory} from 'src/app/core/models/category.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {

  activeCategories: ProductCategory[] = [];
  tempCategories: ProductCategory[] = [];

  constructor(
    private productService: ProductsService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.fetchCategories();

  }

  applyFilter(inputData: string) {
    console.log(inputData);
    if (inputData) {
      for (const categoryIndex in this.activeCategories) {
        this.tempCategories[categoryIndex].products = this.activeCategories[categoryIndex].products.filter(
          (product) => product.name.toLowerCase().includes(inputData.toLowerCase()));
      }
    } else {
      this.fetchCategories();
    }
    // this.tempCategories = this.activeCategories.filter((category: ProductCategory) => category.products.filter(
    //   (product: Product) => product.name.toLowerCase().includes(inputData)
    // ));
  }

  fetchCategories() {
    this.productService.getEnabledProducts().subscribe((response: any) => {
      this.activeCategories = response.categories;
      this.tempCategories = this.activeCategories;
    });
  }
}
