//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
//components
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { SharedModule } from '../../shared/shared.module';
//shared
import { MaterialModule } from '../../material/material.module';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    ProductFormComponent,
    TableComponent,
    DashboardComponent,
    ProductsListComponent,
    FormProductComponent,
    ProductEditComponent,
    AdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdminModule { }
