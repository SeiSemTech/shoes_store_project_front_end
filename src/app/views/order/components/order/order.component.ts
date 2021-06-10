import {Component, OnInit} from '@angular/core';
import {ConfiguredProductStock} from '../../../../core/models/product.model';
import {CartService} from '../../../../core/services/cart.service';
import {SalesService} from 'src/app/core/services/sales/sales.service';
import {MatSnackBar} from '@angular/material';


//Stepper imports
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products: ConfiguredProductStock[];
  displayedColumns: string[] = ['image', 'name', 'price', 'configuration'];

//Stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(
    private cartService: CartService,
    private salesService: SalesService,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.cartService.cart$.subscribe((products) => {
      this.products = products;
    });

  }


  pay() {
    const finalProduct: any[] = [];
    const productCategoryConfiguration = this.products.map(({name, configurations, price}) => ({name, configurations, price}));
    let productOverflowXD = false;
    sells:
      for (const configuration of productCategoryConfiguration) {
        const stock = configuration.configurations[configuration.configurations.length - 1].configuration.sub_configuration;
        const productConfiguration = configuration.configurations.slice(0, configuration.configurations.length - 1);

        for (const productIndex in productConfiguration) {
          const finalStock = productConfiguration[productIndex].configuration.stock - stock;
          productOverflowXD = finalStock < 0;
          if (productOverflowXD) {
            this.snackBar.open(`No se pudo realizar la compra del producto ${configuration.name}, ` +
              `quedan ${productConfiguration[productIndex].configuration.stock} unidades disponibles`, 'cerrar', {duration: 8000});
            break sells;
          }
          productConfiguration[productIndex].configuration.stock -= stock;
          finalProduct.push({...productConfiguration[productIndex], price: configuration.price});
        }
      }
    if (!productOverflowXD && this.products.length > 0) {
      const finalBill = finalProduct.map(({configuration, price}) => ({
        id_product_config: configuration.id,
        quantity: configuration.stock,
        price
      }));
      this.salesService.setUserBill(
        finalBill
      ).subscribe(() => {
        this.cartService.deleteAll();
        this.snackBar.open('Compra exitosa', 'cerrar', {duration: 5000});
        const emailBill = productCategoryConfiguration
          .map(({name, configurations, price}) => (
            {product_name: name, quantity: configurations[configurations.length - 1].configuration.sub_configuration, price}
          ));
        console.log(productCategoryConfiguration)
        console.log(emailBill)
        this.salesService.sendEmail({order: emailBill}).subscribe(() => {
          this.snackBar.open('Se envio la factura a tú correo', 'cerrar', {duration: 5000});
        });

      }, () => {
      });
    }
  }
}
