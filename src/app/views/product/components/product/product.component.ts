import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  stock = 0;
  constructor(
    private router: Router,
    private cartService: CartService
  ) {}
  ngOnInit() { }

  addCart() {
    this.cartService.addCart(this.product);
    console.log(this.stock);
  }


}
