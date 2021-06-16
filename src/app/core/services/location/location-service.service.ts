import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(
    private http: HttpClient
  ) { }

  checkLocation(location: string) {
    return this.http.post(`${environment.url_api}/address`, { input: location });
  }
}
