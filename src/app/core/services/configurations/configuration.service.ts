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

  getAllConfigurations() {
    return this.http.get<Configuration[]>(`${environment.url_api}/get_all_configurations`);
  }

  // getConfiguration(id: string) {
  //   return this.http.get<Configuration>(`${environment.url_api}/get_configuration_by_id/${id}`);
  // }

  createConfiguration(category: Configuration) {
    return this.http.post(`${environment.url_api}/create_configuration/`, category);
  }

  // updateConfiguration(id: string, changes: Partial<Configuration>) {
  //   return this.http.put(`${environment.url_api}/update_configurations/${id}`, changes);
  // }
  //
  // deleteConfiguration(id: string) {
  //   return this.http.delete(`${environment.url_api}/delete_configuration/${id}`);
  // }
}
