import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  createProduct(product: Product) {
    return this.http.post(`${environment.url_api}/products/product`, product);
  }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products/products`);
  }

  getEnabledProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/products/activated_products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${environment.url_api}/products/product/${id}`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.url_api}/products/product/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.patch(`${environment.url_api}/products/update`, product);
  }

}
