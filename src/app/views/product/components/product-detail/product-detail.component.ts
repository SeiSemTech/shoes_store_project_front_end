import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Event, Params, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductBuyerDetailService } from 'src/app/core/services/productBuyerDetail/product-buyer-detail.service';
import * as events from 'events';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  prod: any = [];
  id: number;
  selectOptions: string;
  stock: string;
  subconfiguration: any[] = [];
  config: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private buyerDetailService: ProductBuyerDetailService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
    this.buyerDetailService.detail$.subscribe(products => {
      this.prod = products[0];
    });
  }


  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    console.log(this.stock);
    for (const conf of this.prod.configurations) {
      this.config.push(conf.name);
      this.subconfiguration.push(conf.sub_configuration);
    }
    console.log('CC - ' + this.subconfiguration);
  }
  addCart() {
    let stock = (document.getElementById("stock") as HTMLInputElement).value;
    this.stock = stock;
    console.log(this.stock)
  }

}
