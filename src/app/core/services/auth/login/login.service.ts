import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { IJwt } from './../../../models/auth';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post(`${environment.url_api}/login`, {
      email,password,
    });
  }

  getRole() {
    return this.http.get(`${environment.url_api}/role`);
  }

  loginJWT(token: string): void {
		const decode = jwt_decode<IJwt>(token);
		localStorage.setItem('acces tocken', token);
		// --prueba para jwt_decode
		localStorage.setItem('roles', JSON.stringify(decode.role));
		// localStorage.setItem('roles', JSON.stringify(this.getRole));
		// const lsRol = localStorage.getItem('roles');
		// console.log('lsRol---al get' + lsRol);
	}

  isLoggedIn(): boolean {
		console.log('*****isLoggedIn****');

		const lsRol = localStorage.getItem('roles');
    console.log('lsRol' + lsRol);
		if (!lsRol) {
			return false;
		}
		const rolArray = JSON.parse(lsRol) as Array<string>;
		if (rolArray.length == 0) {
			return false;
		}

		return true;
	}
}
