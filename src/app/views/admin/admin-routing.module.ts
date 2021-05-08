import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsListComponent } from './components/product-list/products-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'create',
    component: ProductFormComponent
  },
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'products/create',
    component: FormProductComponent
  },
  {
    path: 'products/edit/:id',
    component: ProductEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
