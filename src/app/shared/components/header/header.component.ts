import { Component, OnInit, OnChanges } from '@angular/core';

import { map } from 'rxjs/operators';

import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/auth/login/login.service';
// import { Inspector } from 'inspector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  entities: { name: string, url: string }[] = [
    { "name": "Productos", "url": "/admin/products" },
    { "name": "Categorias", "url": "/admin/categories" },
    { "name": "Configuración", "url": "/admin/configurations" },
    { "name": "Configuración del producto", "url": "/admin/product-configurations" }
  ];
  total$: Observable<number>;
  isLogged: boolean;

  constructor(
    private cartService: CartService,
    public loginService: LoginService,
    private router: Router,
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

  // navigateTo(event: any) {

  //   this.router.navigate(['../', value]);
  // }
}
