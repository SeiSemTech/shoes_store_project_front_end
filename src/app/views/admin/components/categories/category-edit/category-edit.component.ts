import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { CategoryService } from 'src/app/core/services/categories/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements AfterViewInit {

  form: FormGroup;
  id: number;
  category: Category;
  displayOrderPattern = '^[0-9]+$';

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,

  ) {
    this.id = Number(route.snapshot.paramMap.get('id'));
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      displayOrder: ['', [Validators.required, Validators.pattern(this.displayOrderPattern)]],
    });
  }

  ngAfterViewInit() {
    const suscribers$: any = [
      this.categoryService.getCategoryById(this.id)
    ];
    forkJoin(suscribers$).subscribe(
      (response: any) => {
        this.category = response[1].category[0];
        this.buildForm();
      }
    );
  }

  private buildForm() {
    this.form.setValue(
      {
        name: this.category.name,
        status: this.category.status,
        displayOrder: this.category.display_order,
      }
    );
  }

  editCategory() {
    const value = this.form.value;
    const editedCategory: any = {
      id: this.id,
      status: value.status,
      display_order: value.displayOrder,
    };
    this.categoryService.updateCategory(editedCategory).subscribe(
      (response: any) => {
        this.snackBar.open('Categoria actualizada', 'Cerrar', { duration: 5000 });
        this.router.navigate(['/admin/categories']);
      },
      (error => {
        this.snackBar.open('Error', 'Cerrar', { duration: 5000 });
      }
      )
    );
  }
}
