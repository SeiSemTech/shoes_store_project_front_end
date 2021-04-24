import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Admin2Component } from './admin2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { FormProductComponent } from './form-product/form-product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductFormComponent } from './product-form/product-form.component';



const routes: Routes = [
  {
    path: '',
    component: Admin2Component
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'create',
    component: ProductFormComponent
  },
  {
    path: 'table',
    component: TableComponent
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
export class Admin2RoutingModule { }
