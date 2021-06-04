import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { ProductConfiguration } from '../../../../../core/models/product-configuration.model';
import { Configuration } from 'src/app/core/models/configuration.model';
import { Product } from 'src/app/core/models/product.model';

import { ProductConfigurationService } from '../../../../../core/services/productConfigurations/product-configuration.service';
import { ConfigurationService } from '../../../../../core/services/configurations/configuration.service';
import { ProductsService } from '../../../../../core/services/products/products.service';

@Component({
  selector: 'app-form-product-conf',
  templateUrl: './form-product-conf.component.html',
  styleUrls: ['./form-product-conf.component.scss']
})
export class FormProductConfComponent implements OnInit {

  form: FormGroup;
  productConfiguration: ProductConfiguration;
  displayOrderPattern = '^[0-9]+$';
  stockPattern = '^[0-9]+$';
  products: Product[];
  configurations: Configuration[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private configurationService: ConfigurationService,
    private productConfigurationService: ProductConfigurationService,
    private productsService: ProductsService) { this.buildForm(); }

  ngOnInit() {
    this.getProducts();
    this.getConfigurations();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      productId: ['', [Validators.required]],
      configurationId: ['', [Validators.required]],
      configDisplayOrder: ['', [Validators.required, Validators.pattern(this.displayOrderPattern)]],
      subConfigDisplayOrder: ['', [Validators.required, Validators.pattern(this.displayOrderPattern)]],
      stock: ['', [Validators.required]],
    });
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe((response: any) => {
      this.products = response.products;
      console.log(response);
    });
  }

  getConfigurations() {
    this.configurationService.getAllConfigurations().subscribe((response: any) => {
      this.configurations = response.configurations;
      console.log(response);
    });
  }

  createProductConfiguration(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const newProductConfiguration: ProductConfiguration = {
        product_id: value.productId,
        configuration_id: value.configurationId,
        config_display_order: value.configDisplayOrder,
        sub_config_display_order: value.subConfigDisplayOrder,
        stock: value.stock,
      };
      this.productConfigurationService.createProductConfiguration(newProductConfiguration).subscribe(
        (response: any) => {
          if (response.message) {
            this.snackBar.open('Configuración del producto creada exitosamente', 'cerrar', { duration: 5000 });
            this.router.navigate(['/product-configurations']);
          } else {
            this.snackBar.open('No es posible crear la configuración del producto.', 'cerrar', { duration: 5000 });
          }
        },
        (error: any) => {
          console.log(error);
          this.snackBar.open('Ha ocurrido un error inesperado.', 'cerrar', { duration: 5000 });
        }
      );
    }
  }

}
