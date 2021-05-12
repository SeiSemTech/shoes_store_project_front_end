import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../../models/product.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/get_products`);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/create_product/`, product);
  }

  updateProduct(id: number, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }
}
