import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { IJwt } from './../../../models/auth';
import jwt_decode from 'jwt-decode'
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isLogged: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isLogged = window.localStorage.getItem('access_token') != null;
  }

  login(email: string, password: string) {
    return this.http.post(`${environment.url_api}/login`, {
      email, password,
    });
  }

  getRole() {
    return this.http.get(`${environment.url_api}/role`);
  }

  loginJWT(token: string): void {
      const decode = jwt_decode<IJwt>(token);
      localStorage.setItem('access_token', token);
      localStorage.setItem('roles', JSON.stringify(decode.role));
      this.isLogged = true;
  }

  isLoggedIn(): boolean {
    const lsRol = localStorage.getItem('roles');
    if (!lsRol) {
      return false;
    }
    const rolArray = JSON.parse(lsRol) as Array<string>;
    if (rolArray.length === 0) {
      return false;
    }
    return true;
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/home']);
    this.isLogged = window.localStorage.getItem('access_token') != null;
  }
}
