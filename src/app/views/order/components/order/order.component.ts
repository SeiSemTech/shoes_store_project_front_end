import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {ConfiguredProduct, ConfiguredProductStock} from '../../../../core/models/product.model';
import { CartService } from '../../../../core/services/cart.service';
import {MatTableDataSource} from '@angular/material';
import {SalesService} from 'src/app/core/services/sales/sales.service';
import {ProductsService} from 'src/app/core/services/products/products.service';
import {Product, ProductCategory} from 'src/app/core/models/category.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products$: Observable<ConfiguredProductStock[]>;
  displayedColumns: string[] = ['image', 'name', 'price', 'configuration'];

  constructor(
    private cartService: CartService,
    private salesService: SalesService,
    private productService: ProductsService
  ) {
    this.products$ = cartService.cart$;
  }

  ngOnInit() { }


  pay() {
    let filteredProducts: any[];
    this.productService.getEnabledProducts().subscribe((response: any) => {
      filteredProducts = response.categories;
      filteredProducts = filteredProducts.map(
        ({ products }) => ( products )
      );
      filteredProducts = filteredProducts.reduce((accumulator, value) => accumulator.concat(value), []);
      console.log(filteredProducts);
    });

    // TODO YA LOS PRODUCTOS ESTÁN EN UNA LISTA EN FILTERED PRODUCTS
    // AHORA HAY QUE RESTAR POR PRODUCT CONFIGURATION UN STOCK, Y SI... NO TENEMOS EL PRODUCT CONFIG ID :D
    // ENTONCES, LO MÁS PROBABLE ES QUE TOQUE RESTARLE A CUALQUIER MIERDA Y SALE :D




    // this.products$.subscribe((products: ConfiguredProductStock[]) => {
    //   const productDescription = products.map(
    //     ({ id, configurations, price }) => (
    //       {id_product_config: id, quantity: configurations[configurations.length - 1].configuration.sub_configuration, price}
    //     )
    //   );
    //   console.log(productDescription);
    //   this.salesService.setUserBill(
    //     productDescription
    //   ).subscribe();
    // });
  }
}
