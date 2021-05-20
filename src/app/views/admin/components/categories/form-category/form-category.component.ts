import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/categories/category.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

  form: FormGroup;
  category: Category;
  displayOrderPattern = '^[0-9]+$';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar) { this.buildForm(); }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      displayOrder: ['', [Validators.required, Validators.pattern(this.displayOrderPattern)]],
    });
  }

  createCategory(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const newCategory: Category = {
        name: value.name,
        status: value.status,
        display_order: value.displayOrder,
      };
      this.categoryService.createCategory(newCategory).subscribe(
        (response: any) => {
          console.log(response, response.status_code);
          this.snackBar.open('Categoria creada con éxito.', 'cerrar', { duration: 5000 });
        },
        (error: any) => {
          console.log(error);
          this.snackBar.open('Ha ocurrido un error inesperado.', 'cerrar', { duration: 5000 });
        }
      );
    }
  }

  // createCategory(event: Event) {
  //   event.preventDefault();
  //   if (this.form.valid) {
  //     const value = this.form.value;
  //     const newCategory: Category = {
  //       name: value.name,
  //       status: value.status,
  //       display_order: value.displayOrder,
  //     }
  //     this.categoryService.createCategory(newCategory).subscribe(
  //       (response: any) => {
  //         console.log(response, response.status_code);
  //         if (response.status_code === 201) {
  //           this.snackBar.open('Categoria creada exitosamente', 'cerrar', { duration: 5000 })
  //           this.router.navigate(['/categories']);
  //         } else {
  //           this.snackBar.open('No es posible crear esta categoria.', 'cerrar', { duration: 5000 })
  //         }
  //       },
  //       (error: any) => {
  //         console.log(error);
  //         this.snackBar.open('Ha ocurrido un error inesperado.', 'cerrar', { duration: 5000 })
  //       }
  //     );
  //   }
  // }

}
