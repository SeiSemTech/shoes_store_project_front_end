import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProductsService } from '../../../../core/services/products/products.service';
import { Product } from '../../../../core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ConfigurationService } from '../../../../core/services/configurations/configuration.service';
import { FormGroup } from '@angular/forms';
import { ProductConfiguration } from '../../../../core/models/product-configuration.model';
import { ProductBuyerDetailService } from 'src/app/core/services/productBuyerDetail/product-buyer-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  prod: any = [];
  id: number;

  constructor(
    private route: ActivatedRoute,
    private buyerDetailService: ProductBuyerDetailService,
    private cartService: CartService,
  ) {
    this.buyerDetailService.detail$.subscribe(products => {
      this.prod = products[0];
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    console.log(this.prod);
  }

  addCart() {
    console.log('añadir al carrito');
    this.cartService.addCart(this.product);
  }

}
