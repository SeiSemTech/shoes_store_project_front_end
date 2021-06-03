import {Component, OnInit} from '@angular/core';

import { ConfiguredProductStock} from '../../../../core/models/product.model';
import {CartService} from '../../../../core/services/cart.service';
import {SalesService} from 'src/app/core/services/sales/sales.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products: ConfiguredProductStock[];
  displayedColumns: string[] = ['image', 'name', 'price', 'configuration'];

  constructor(
    private cartService: CartService,
    private salesService: SalesService,
  ) {

  }

  ngOnInit() {
    this.cartService.cart$.subscribe((products) => {
      this.products = products;
    });
  }


  pay() {
    const finalProduct: any[] = [];
    const productCategoryConfiguration = this.products.map(({name, configurations, price}) => ({name, configurations, price}));
    let productOverflowXD = false;
    console.log(productCategoryConfiguration);

    sells:
      for (const configuration of productCategoryConfiguration) {
        const stock = configuration.configurations[configuration.configurations.length - 1].configuration.sub_configuration;
        const productConfiguration = configuration.configurations.slice(0, configuration.configurations.length - 1);

        for (const productIndex in productConfiguration) {
          const finalStock = productConfiguration[productIndex].configuration.stock - stock;
          productOverflowXD = finalStock < 0;
          if (productOverflowXD) {
            alert(`No se pudo realizar la compra del producto ${configuration.name},` +
              `quedan ${productConfiguration[productIndex].configuration.stock} unidades disponibles`);
            break sells;
          }
          productConfiguration[productIndex].configuration.stock -= stock;
          finalProduct.push({...productConfiguration[productIndex], price: configuration.price});
        }
      }
    if (!productOverflowXD) {
      const finalBill = finalProduct.map(({configuration, price}) => ({
        id_product_config: configuration.id,
        quantity: configuration.stock,
        price
      }));
      console.log(finalBill);
      this.salesService.setUserBill(
        finalBill
      ).subscribe(() => {
        this.cartService.deleteAll();
        alert('Compra exitosa')
      }, () => {
      });
    }
  }
}
