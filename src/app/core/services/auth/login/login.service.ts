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
  public role: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.isLogged = window.localStorage.getItem('access_token') != null;
    this.role = window.localStorage.getItem('roles');
  }

  login(email: string, password: string) {
    return this.http.post(`${environment.url_api}/login`, {
      email, password,
    });
  }

  setPassword(password: string, token: string) {
    const email: string = window.localStorage.getItem('email');
    return this.http.post(`${environment.url_api}/password`, {
      email, password, code: token
    });
  }

  getPassword(email: string) {
    return this.http.get(`${environment.url_api}/password/${email}`);
  }

  loginJWT(token: string): void {
      const decode = jwt_decode<IJwt>(token);
      localStorage.setItem('access_token', token);
      localStorage.setItem('roles', decode.role.toString());
      this.role = decode.role.toString();
      this.isLogged = true;
  }

  isLoggedIn(): boolean {
    const lsRol = localStorage.getItem('roles');
    if (!lsRol) {
      return false;
    }
    const rolArray = lsRol;
    if (rolArray.length === 0) {
      return false;
    }
    return true;
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/home']);
    this.role = null;
    this.isLogged = window.localStorage.getItem('access_token') != null;
  }
}
