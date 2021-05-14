import { Component, OnInit, OnChanges } from '@angular/core';

import { map } from 'rxjs/operators';

import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/core/services/auth/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total$: Observable<number>;
  isLogged: boolean;

  constructor(
    private cartService: CartService,
    private loginService: LoginService
  ) {
    this.total$ = this.cartService.cart$
    .pipe(
      map(products => products.length)
    );
  }

  ngOnInit() {
    this.isLogged = window.localStorage.getItem('access_token') != null;
  }

  logout() {
    this.loginService.logout();
  }

}
