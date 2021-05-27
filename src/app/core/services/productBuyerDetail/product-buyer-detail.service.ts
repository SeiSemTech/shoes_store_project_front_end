import {Injectable, OnDestroy} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductBuyerDetailService {
  private products: any[] = [];
  private detail = new BehaviorSubject<any[]>([]);
  detail$ = this.detail.asObservable();

  constructor() { }
  addDetail(product: any) {
    this.products = [...this.products, product];
    /*console.log('detaill addservice ' + this.products.length);*/
    this.detail.next(this.products);
/*    console.log('getvalue ' + this.detail.getValue());*/
  }
  set(): void {
    this.products = [];
  }
}
