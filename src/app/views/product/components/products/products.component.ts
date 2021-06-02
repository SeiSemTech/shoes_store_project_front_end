import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { ProductsService } from '../../../../core/services/products/products.service';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {

  activeCategories: any[] = [];
  tempCategories: any[] = [];
  public columns = ['name', 'description', 'price'];



  constructor(
    private productService: ProductsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activeCategories = this.fetchCategories();
    console.log(this.activeCategories);

    this.tempCategories =  this.fetchCategories();
    console.log(this.tempCategories);


  }


  applyFilter(x: String) {

    console.log(x);
    if(x == ''){
      console.log(this.tempCategories);
      this.tempCategories = this.fetchCategories();
     
    }else{
      for(const categoryIndex in this.activeCategories){
                this.tempCategories[categoryIndex].products = this.activeCategories[categoryIndex].products.filter((product) => product.name.toLowerCase().includes(x.toLowerCase()));
        } 
    }
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }
 
  fetchCategories(): any[] {
    const categories: any[]=[];
    this.productService.getEnabledProducts().subscribe((response: any) => {
      for (const category of response.categories) {
        categories.push(category);
      }
    });

    return categories;
  }




}
