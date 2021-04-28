import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './../../../models/user.model';
import { environment } from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(name: string, email: string, phone: string) {
    return this.http.post(`${environment.url_api}/create`, {
      name,
      email,
      phone
    });
  }
}
