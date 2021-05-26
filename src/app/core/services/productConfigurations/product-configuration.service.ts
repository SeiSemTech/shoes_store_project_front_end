import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProductConfiguration } from './../../models/product-configuration.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductConfigurationService {

  constructor(private http: HttpClient) { }

  createProductConfiguration(productConfiguration: ProductConfiguration) {
    return this.http.post(`${environment.url_api}/products/product_configuration`, productConfiguration);
  }

  updateProductConfiguration(productConfiguration: ProductConfiguration) {
    return this.http.patch(`${environment.url_api}/products/product_configuration`, productConfiguration);
  }

  getProductConfigurationById(id: number) {
    return this.http.get<ProductConfiguration>(`${environment.url_api}/products/product_configuration/${id}`);
  }

  deleteProductConfiguration(id: number) {
    return this.http.delete(`${environment.url_api}/products/product_configurations/${id}`);
  }

  getAllProductConfigurations() {
    return this.http.get<ProductConfiguration[]>(`${environment.url_api}/products/product_configurations`);
  }

}
