import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductConfiguration } from './../../models/product-configuration.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductConfigurationService {

  constructor(private http: HttpClient) { }

  getAllProductConfigurations() {
    return this.http.get<ProductConfiguration[]>(`${environment.url_api}/product_configurations`);
  }

  getProductConfiguration(id: string) {
    return this.http.get<ProductConfiguration>(`${environment.url_api}/product_configurations/${id}`);
  }

  createProductConfiguration(category: ProductConfiguration) {
    return this.http.post(`${environment.url_api}/create_product_configuration/`, category);
  }

  updateProductConfiguration(id: string, changes: Partial<ProductConfiguration>) {
    return this.http.put(`${environment.url_api}/product_configurations/${id}`, changes);
  }

  deleteProductConfiguration(id: string) {
    return this.http.delete(`${environment.url_api}/delete_product_configuration/${id}`);
  }

}
