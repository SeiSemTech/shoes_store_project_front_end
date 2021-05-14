import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from 'src/app/core/services/products/products.service';
import {Product} from 'src/app/core/models/product.model';
import {MatSnackBar} from '@angular/material';
import {CategoryService} from 'src/app/core/services/categories/category.service';
import {Category} from 'src/app/core/models/category.model';
import {forkJoin} from 'rxjs';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements AfterViewInit {

  form: FormGroup;
  id: number;
  product: Product;
  imageUrlPattern = '^(?!mailto)(?:https?|ftp):/(?:/?(?:[.#@?=]?[a-z0-9\u00a1-\uffff]+)+)+[.]?(?:png|jpg|jpe?g)$';
  pricePattern = '^[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$';
  displayOrderPattern = '^[0-9]+$';
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private categoryService: CategoryService,
  ) {
    this.id = Number(route.snapshot.paramMap.get('id'));
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

  ngAfterViewInit() {
    const suscribers$: any = [
      this.categoryService.getAllCategories(),
      this.productService.getProductById(this.id)
    ];
    forkJoin(suscribers$).subscribe(
      (response: any) => {
        this.categories = response[0].categories;
        this.product = response[1].product[0];
        this.buildForm();
      }
    );
  }

  private buildForm() {
    let category = null;
    this.categories.forEach((item: any) => {
      if (item.id === this.product.category_id) {
        category = item.name;
      }
    });
    this.form.setValue(
      {
        name: this.product.name,
        image: this.product.image,
        price: this.product.price,
        status: this.product.status,
        description: this.product.description,
        displayOrder: this.product.display_order,
        categoryId: this.product.category_id
      }
    );
  }

  editProduct() {
    const value = this.form.value;
    const editedProduct: any = {
      id: this.id,
      name: value.name,
      status: value.status,
      image: value.image,
      price: value.price,
      description: value.description,
      display_order: value.displayOrder,
      category_id: value.categoryId,
    };
    this.productService.updateProduct(editedProduct).subscribe(
      (response: any) => {
        this.snackBar.open('Producto actualizado', 'Cerrar', {duration: 5000});
        this.router.navigate(['/admin/products']);
      },
      (error => {
        this.snackBar.open('Error', 'Cerrar', {duration: 5000});
      }
      )
    );
  }

}
