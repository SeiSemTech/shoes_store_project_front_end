import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Product } from '../../../../../core/models/product.model';
import { ProductsService } from '../../../../../core/services/products/products.service'
import { CategoryService } from '../../../../../core/services/categories/category.service'
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  product: Product;
  imageUrlPattern = '^(?!mailto)(?:https?|ftp):/(?:/?(?:[.#@?=]?[a-z0-9\u00a1-\uffff]+)+)+[.]?(?:png|jpg|jpe?g)$';
  pricePattern = '^[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$';
  displayOrderPattern = '^[0-9]+$';
  categories: Category[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private productsService: ProductsService,
    private categoryService: CategoryService,
  ) { this.buildForm(); }

  ngOnInit() {
    this.getCategories();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.pattern(this.imageUrlPattern)]],
      price: ['', [Validators.required, Validators.pattern(this.pricePattern)]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
      displayOrder: ['', [Validators.required, Validators.pattern(this.displayOrderPattern)]],
      categoryId: ['', [Validators.required]],
    });
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response.categories;
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
        display_order: value.displayOrder,
        category_id: value.categoryId,
      }
      this.productsService.createProduct(newProduct).subscribe(
        (response: any) => {
          console.log(response.status_code);
          if (response.status_code === 201) {
            this.snackBar.open('Producto creado exitosamente', 'cerrar', { duration: 5000 })
            this.router.navigate(['/products']);
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
