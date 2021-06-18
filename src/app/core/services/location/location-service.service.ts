import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Location } from './../../models/location.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(
    private http: HttpClient
  ) { }

  checkLocation(input: Location) {
    return this.http.post(`${environment.url_api}/address`, input);
  }
}
