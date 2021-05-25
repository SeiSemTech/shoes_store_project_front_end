import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../core/models/product.model';

import { CartService } from '../../../../core/services/cart.service';

// export interface Conf {
//   selected: boolean;
//   configurations?: Conf[];
// }

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit, OnDestroy {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();
  productStock = [{ "value": 1 }, { "value": 2 }];
  configuration = [
    { name: 'Talla', subConfiguration: '38', extraPrice: 0, selected: false },
    { name: 'Talla', subConfiguration: '39', extraPrice: 5000, selected: false },
    { name: 'Talla', subConfiguration: '40', extraPrice: 8000, selected: false }
  ]
  productConfigurations: [
    { configDisplay: 1, subConfigDisplay: 1 },
    { configDisplay: 1, subConfigDisplay: 2 },
    { configDisplay: 1, subConfigDisplay: 3 }
  ]
  today = new Date();

  // conf: Conf = {
  // selected: false,
  // configurations: [
  //   {
  //     id: 1,
  //     name: "Talla",
  //     "sub_configuratuion": "38",
  //     "extra_price": 0,
  //     "config_display_order": 1,
  //     "sub_config_display_order": 1,
  //     "stock": 5
  //   },
  //   {
  //     "id": 2,
  //     "name": "Talla",
  //     "sub_configuratuion": "39",
  //     "extra_price": 10000,
  //     "config_display_order": 1,
  //     "sub_config_display_order": 2,
  //     "stock": 5
  //   }
  // ]
  // };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {
    console.log('1. constructor');
  }

  ngOnInit() {
    console.log('3. ngOnInit');
  }

  ngOnDestroy() {
    console.log('5. ngOnDestroy');
  }

  addCart() {
    console.log('añadir al carrito');
    this.cartService.addCart(this.product);
    // this.productClicked.emit(this.product.id);
  }

  // updateConfigSelected() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // public resolveRoute() {
  //   const baseUrl = environment.baseUrl;
  //   return ${ baseUrl } /foto_producto/${ this.producto.foto };
  // }

}
