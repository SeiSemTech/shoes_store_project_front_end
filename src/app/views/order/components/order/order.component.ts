import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {ConfiguredProduct, ConfiguredProductStock} from '../../../../core/models/product.model';
import { CartService } from '../../../../core/services/cart.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products: MatTableDataSource<ConfiguredProductStock[]>;
  displayedColumns: string[] = ['image', 'name', 'price', 'configuration'];

  constructor(
    private cartService: CartService
  ) {

  }

  showData() {
    console.log(this.cartService.cart$);
    console.log(this.products);
  }

  ngOnInit() {
  }
}
