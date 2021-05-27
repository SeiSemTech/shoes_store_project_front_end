import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductBuyerDetailService } from 'src/app/core/services/productBuyerDetail/product-buyer-detail.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit, OnDestroy {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor(
    private router: Router,
    private buyerDetailService: ProductBuyerDetailService
  ) {
    console.log('1. constructor');
  }

  ngOnInit() {
    console.log('3. ngOnInit');
  }

  ngOnDestroy() {
    console.log('5. ngOnDestroy');
  }

  addBuyerDetail() {
    this.buyerDetailService.addDetail(this.product);
    console.log(this.product);
  }

}
