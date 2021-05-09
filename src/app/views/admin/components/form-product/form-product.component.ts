import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Product } from '../../../../core/models/product.model';
import { ProductsService } from '../../../../core/services/products/products.service'

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  product: Product;
  imageUrlPattern = '^(?!mailto)(?:https?|ftp):/(?:/?(?:[.#@?=]?[a-z0-9\u00a1-\uffff]+)+)+[.]?(?:png|jpe?g)$';
  pricePattern = '^[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$';
  categoriesList = [
    { id: 1, name: 'Promociones' },
    { id: 2, name: 'Temporada de verano' },
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
  ) { this.buildForm(); }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.pattern(this.imageUrlPattern)]],
      price: ['', [Validators.required, Validators.pattern(this.pricePattern)]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      getErrorMessage() {
        if (this.form.value.hasError('required')) {
          return 'You must enter a value';
        }
        return this.form.value.hasError('image') ? 'Not a valid entry' : '';
      }
    });
  }

  createProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const newProduct: Product = {
        name: value.name,
        image: value.image,
        price: value.price,
        status: value.status,
        description: value.description,
        categoryId: value.categoryId,
      }
      this.productsService.createProduct(newProduct).subscribe(
        (response: any) => {
          if (response.status_code === 201) {
            this.router.navigate(['/products']);
            this.snackBar.open('Producto creado exitosamente', 'cerrar', { duration: 5000 })
          } else {
            this.snackBar.open('No es posible crear este producto.', 'cerrar', { duration: 5000 })
          }
        },
        (error: any) => {
          console.log(error);
          this.snackBar.open('Ha ocurrido un error inesperado.', 'cerrar', { duration: 5000 })
        }
      );
    }
  }

  showFormControl(x) {
    console.log(x);
  }
}
