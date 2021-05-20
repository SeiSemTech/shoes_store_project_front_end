import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Configuration } from './../../models/configuration.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private http: HttpClient
  ) { }

  createConfiguration(configuration: Configuration) {
    return this.http.post(`${environment.url_api}/products/configuration/`, configuration);
  }

  updateConfiguration(configuration: Configuration) {
    return this.http.put(`${environment.url_api}/products/configuration/`, configuration);
  }

  getConfigurationById(id: number) {
    return this.http.get<Configuration>(`${environment.url_api}/products/configuration/${id}`);
  }

  deleteConfiguration(id: number) {
    return this.http.delete(`${environment.url_api}/products/configuration/${id}`);
  }

  getAllConfigurations() {
    return this.http.get<Configuration[]>(`${environment.url_api}/products/configurations`);
  }

}
