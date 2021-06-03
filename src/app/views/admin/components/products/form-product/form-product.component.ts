import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Product } from '../../../../../core/models/product.model';
import { ProductsService } from '../../../../../core/services/products/products.service';
import { CategoryService } from '../../../../../core/services/categories/category.service';
import { Category } from 'src/app/core/models/category.model';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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

  uploadProgress: Observable<Number>;
  uploadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
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
      image: ['', []],
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
      let imageUrl = '';
      this.uploadURL.subscribe((image) => {
        imageUrl = image;
        console.log(imageUrl)
      });
      const value = this.form.value;
      const newProduct: Product = {
        name: value.name,
        status: value.status,
        image: imageUrl,
        price: value.price,
        description: value.description,
        display_order: value.displayOrder,
        category_id: value.categoryId,
      };
      this.productsService.createProduct(newProduct).subscribe(
        (response: any) => {
          this.snackBar.open('Producto creado exitosamente', 'cerrar', { duration: 5000 });
          this.router.navigate(['/admin/products']);
        },
        (error: any) => {
          this.snackBar.open('Ha ocurrido un error inesperado.', 'cerrar', { duration: 5000 });
        }
      );
    }
  }

  upload(event) {
    // Get input file
    const file = event.target.files[0];
    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    const filepath = `images/${randomId}`;
    const fileRef = this.storage.ref(filepath);

    // Upload image
    const task = this.storage.upload(filepath, file);

    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
  }
  showFormControl(x) {
    console.log(x);
  }
}

