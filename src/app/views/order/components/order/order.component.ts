import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatStepper } from '@angular/material';

import { ConfiguredProductStock } from '../../../../core/models/product.model';

import { CartService } from '../../../../core/services/cart.service';
import { SalesService } from 'src/app/core/services/sales/sales.service';
import { LocationService } from 'src/app/core/services/location/location-service.service';

import { Location, locationResponse } from 'src/app/core/models/location.model';

import { concat } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  products: ConfiguredProductStock[];
  displayedColumns: string[] = ['image', 'name', 'price', 'configuration'];
  selectedDeparment: string;
  selectedStreetType: string;
  departments: { name: string }[] = [
    { name: 'Antioquia' },
    { name: 'Atlantico' },
    { name: 'Bogotá' },
    { name: 'Bolivar' },
    { name: 'Boyacá' },
    { name: 'Caldas' },
    { name: 'Caqueta' },
    { name: 'Casanare' },
    { name: 'Cauca' },
    { name: 'Cesar' },
    { name: 'Cordoba' },
    { name: 'Cundinamarca' },
    { name: 'Guajira' },
    { name: 'Guaviare' },
    { name: 'Huila' },
    { name: 'Magdalena' },
    { name: 'Meta' },
    { name: 'Nariño' },
    { name: 'Norte de santander' },
    { name: 'Quindio' },
    { name: 'Risaralda' },
    { name: 'Santander' },
    { name: 'Sucre' },
    { name: 'Tolima' },
    { name: 'Valle del cauca' }
  ]
  city: string;
  types: { name: string }[] = [
    { name: 'Via' },
    { name: 'Calle' },
    { name: 'Carrera' },
    { name: 'Transversal' },
    { name: 'Diagonal' },
    { name: 'Autopista' },
    { name: 'Avenida Carrera' },
    { name: 'Avenida Calle' },
    { name: 'Avenida' },
    { name: 'Circular' },
  ]
  principalVia: string;
  secoundaryVia: string;
  numberVia: string;
  address: string = '';

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  shippingForm: FormGroup;

  constructor(
    private cartService: CartService,
    private salesService: SalesService,
    private locationService: LocationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private _shippingFormBuilder: FormBuilder
  ) { this.buildShippingForm(); }

  ngOnInit() {
    this.cartService.cart$.subscribe((products) => {
      this.products = products;
    });
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  private buildShippingForm() {
    this.shippingForm = this._shippingFormBuilder.group({
      selDeparment: ['', [Validators.required]],
      city: ['', [Validators.required]],
      streetType: ['', [Validators.required]],
      principal: ['', [Validators.required]],
      secoundary: ['', [Validators.required]],
      number: ['', [Validators.required]]
    });
  }

  checkLocation(event: Event) {
    event.preventDefault();
    if (this.shippingForm.valid) {
      const value = this.shippingForm.value;
      this.address = this.address.concat(value.selDeparment, ', ', value.city, ', ', value.streetType, ', ', value.principal, ' # ', value.secoundary, ' - ', value.number);
      const input: Location = {
        input: this.address,
      };
      console.log(input);
      this.locationService.checkLocation(input).subscribe(
        (response: locationResponse) => {
          if (!response.error) {
            console.log(response);
            this.snackBar.open('La dirección es correcta.', 'cerrar', { duration: 5000 });
            this.stepper.next();
          }
          else {
            this.snackBar.open('Ha ocurrido un error inesperado.', 'cerrar', { duration: 5000 });
          }
        },
      );
      this.address = '';
    }
  }

  checkNextStep(value: true) {
    if (value) {
      true;
    }
    else {
      false;
    }
  }

  pay() {
    const finalProduct: any[] = [];
    const productCategoryConfiguration = this.products.map(({ name, configurations, price }) => ({ name, configurations, price }));
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
            `quedan ${productConfiguration[productIndex].configuration.stock} unidades disponibles`, 'cerrar', { duration: 8000 });
          break sells;
        }
        productConfiguration[productIndex].configuration.stock -= stock;
        finalProduct.push({ ...productConfiguration[productIndex], price: configuration.price });
      }
    }
    if (!productOverflowXD && this.products.length > 0) {
      const finalBill = finalProduct.map(({ configuration, price }) => ({
        id_product_config: configuration.id,
        quantity: configuration.stock,
        price
      }));
      this.salesService.setUserBill(
        finalBill
      ).subscribe(() => {
        this.cartService.deleteAll();
        this.snackBar.open('Compra exitosa', 'cerrar', { duration: 5000 });
        const emailBill = productCategoryConfiguration
          .map(({ name, configurations, price }) => (
            { product_name: name, quantity: configurations[configurations.length - 1].configuration.sub_configuration, price }
          ));
        console.log(productCategoryConfiguration)
        console.log(emailBill)
        this.salesService.sendEmail({ order: emailBill }).subscribe(() => {
          this.snackBar.open('Se envio la factura a tú correo', 'cerrar', { duration: 5000 });
          this.router.navigateByUrl('/home');
        });
      }, () => {
      });
    }
  }
}
