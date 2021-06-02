import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ConfiguredProduct} from 'src/app/core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: ConfiguredProduct[];
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  constructor() {
    this.getProductsFromLocalStorage();
  }

  getProductsFromLocalStorage() {
    const products: string = localStorage.getItem('check-out-card');
    if (products) {
      this.products = JSON.parse(products);
      this.cart.next(this.products);
    } else {
      this.products = [];
    }
  }

  setProductsOfLocalStorage() {
    localStorage.setItem('check-out-card', JSON.stringify(this.products));
  }

  addCart(product: any) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
    this.setProductsOfLocalStorage();
  }
  deletCart(id: number) {
    const i = this.products.indexOf( id );
    this.products.splice(i, 1);
  }
}
