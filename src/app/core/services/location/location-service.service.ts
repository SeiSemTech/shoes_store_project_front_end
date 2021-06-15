import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(
    private http: HttpClient
  ) { }

  checkLocation(location: string) {
    return this.http.post(`https://seim-location.azurewebsites.net/location`, { input: location });
  }
}

