import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import {ConfigurationService} from '../../../../core/services/configurations/configuration.service';
import {FormGroup} from '@angular/forms';
import {ProductConfiguration} from '../../../../core/models/product-configuration.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  configuration = [
    { name: 'Talla', subConfiguration: '38', extraPrice: 0, selected: false },
    { name: 'Talla', subConfiguration: '39', extraPrice: 5000, selected: false },
    { name: 'Talla', subConfiguration: '40', extraPrice: 8000, selected: false }
  ];

  form: FormGroup;
  productConfiguration: ProductConfiguration;
  displayOrderPattern = '^[0-9]+$';
  stockPattern = '^[0-9]+$';
  products: [];
  configurations: [];
  productStock = [{ "value": 1 }, { "value": 2 }];
  productConfigurations: [
    { configDisplay: 1, subConfigDisplay: 1 },
    { configDisplay: 1, subConfigDisplay: 2 },
    { configDisplay: 1, subConfigDisplay: 3 }
  ];
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService,
    private configurationService: ConfigurationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      // this.product = this.productsService.getProduct(id);
    });
    console.log(this.products);
  }

  fetchProduct(id: number) {
    this.productsService.getProductById(id)
      .subscribe(product => {
        this.product = product;
      });
  }

  createProduct() {
    const newProduct: Product = {
      name: 'test',
      status: 1,
      image: 'test',
      price: 1,
      description: 'test',
      category_id: 1,
      display_order: 1,
    };
    this.productsService.createProduct(newProduct)
      .subscribe(product => {
        console.log(product);
      });
  }

  addCart() {
    console.log('añadir al carrito');
    this.cartService.addCart(this.product);
    /*this.productClicked.emit(this.product.id);*/
  }

  // updateProduct() {
  //   const updateProduct: Partial<Product> = {
  //     price: 555555,
  //     description: 'edicion titulo'
  //   };
  //   this.productsService.updateProduct(updateProduct)
  //     .subscribe(product => {
  //       console.log(product);
  //     });
  // }

  deleteProduct() {
    this.productsService.deleteProduct(222)
      .subscribe(rta => {
        console.log(rta);
      });
  }

}
