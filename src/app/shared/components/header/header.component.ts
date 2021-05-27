import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';

import { CartService } from './../../../core/services/cart.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/auth/login/login.service';
import {ProductsService} from '../../../core/services/products/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  products: any[] = [];
  entities: { name: string, url: string }[] = [
    { name: 'Productos', url: '/admin/products' },
    { name: 'Categorias', url: '/admin/categories' },
    { name: 'Configuración', url: '/admin/configurations' },
    { name: 'Configuración del producto', url: '/admin/product-configurations' }
  ];
  /*total$: Observable<number>;*/
  isLogged: boolean;
  availableProductRoles: string[] = ['Administrador', 'Usuario Registrado'];
  total = 0;
  constructor(
    private cartService: CartService,
    public loginService: LoginService,
    private productService: ProductsService,
    private router: Router,
  ) {
    this.cartService.cart$.subscribe(products => {
      console.log(products);
      this.products = products;
      this.total = products.length;
    });
    /*this.total$ = this.cartService.cart$
      .pipe(
        map(products => products.length)
      );*/
  }

  public totalp() {
    // Quién te conoce reduce
    let total = 0;
    this.products.forEach(p => total += p.price);
    return total;
  }
  ngOnInit() {
    this.isLogged = window.localStorage.getItem('access_token') != null;
  }

  logout() {
    this.loginService.logout();
  }
}
