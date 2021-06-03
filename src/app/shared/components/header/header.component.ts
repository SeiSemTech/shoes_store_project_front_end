import { Component, OnInit } from '@angular/core';
import { CartService } from './../../../core/services/cart.service';
import { LoginService } from 'src/app/core/services/auth/login/login.service';

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
    { name: 'Configuración del producto', url: '/admin/product-configurations' },
    { name: 'Ventas', url: '/admin/sales' }
  ];

  isLogged: boolean;
  availableProductRoles: string[] = ['Administrador', 'Usuario Registrado'];
  total = 0;
  constructor(
    private cartService: CartService,
    public loginService: LoginService,
  ) {
    this.cartService.cart$.subscribe(products => {
      this.products = products;
      this.total = products.length;
    });
  }

  public totalp() {
    let toto = 0;
    this.products.forEach(p => toto += p.price * p.configurations[p.configurations.length - 1].configuration.sub_configuration);
    return toto;
  }
  ngOnInit() {
    this.isLogged = window.localStorage.getItem('access_token') != null;
  }
  public async quitar(producto) {
    // Comunicación entre componentes
    await this.cartService.deletCart(producto.id);
    this.total = this.products.length;
    this.totalp();
    console.log(this.products);
  }

  logout() {
    this.loginService.logout();
  }
}
