import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: any[] = [];
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  constructor() { }
  addCart(product: any ) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
  deletCart(id: number) {
    const i = this.products.indexOf( id );
    this.products.splice(i, 1);
  }
}
