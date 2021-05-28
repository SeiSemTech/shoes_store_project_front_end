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

export class ProductComponent implements OnInit {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  today = new Date();

  constructor(
    private router: Router,
    private buyerDetailService: ProductBuyerDetailService
  ) {}
  ngOnInit() {
    /*console.log('oninit product' + this.product.name);*/
  }
  addBuyerDetail() {
    this.buyerDetailService.set();
    this.buyerDetailService.addDetail(this.product);
/*    console.log(this.product);*/
  }

}
