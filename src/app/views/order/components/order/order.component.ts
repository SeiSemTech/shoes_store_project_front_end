import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<any[]>;

  constructor(
    private cartService: CartService
  ) {
    this.products$ = this.cartService.cart$;
    console.log(this.products$);
  }
  ngOnInit() {
  }
}
