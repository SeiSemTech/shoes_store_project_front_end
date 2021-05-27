import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
      // this.product = this.productsService.getProduct(id);
    });
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
    // this.productClicked.emit(this.product.id);
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
