import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  categoriesList = [
    { id: '1', name: 'Hombres' },
    { id: '2', name: 'Mujeres' },
    { id: '3', name: 'Niños' }
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ProductsService: ProductsService,
  ) { this.buildForm(); }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', []],
      price: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stockQuantity: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
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
        stockQuantity: value.stockQuantity,
        categoryId: this.saveCategory(value.categoryId),
      }
      this.ProductsService.createProduct(newProduct).subscribe(
        (response: any) => {
          if (response.status_code === 201) {
            this.router.navigate(['/products']);
            alert('Producto creado.');
          } else {
            alert('No es posible crear este producto.');
          }
        },
        (error: any) => { console.log(error); }
      );
    }
  }

  public saveCategory(e): number {
    let name = e.target.value;
    let category = this.categoriesList.filter(x => x.id === name)[0];
    console.log(category.id);
    return Number(category.id);
  }
}
