import { Injectable } from '@angular/core';
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
    this.detail.next(this.products);
  }
}
