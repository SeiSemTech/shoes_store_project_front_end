//angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//components
import { Admin2RoutingModule } from './admin2-routing.module';
import { Admin2Component } from './admin2.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableComponent } from './table/table.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { FormProductComponent } from './form-product/form-product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductFormComponent } from './product-form/product-form.component';

//shared
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    Admin2Component,
    ProductFormComponent,
    TableComponent,
    DashboardComponent,
    ProductsListComponent,
    FormProductComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    Admin2RoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class Admin2Module { }
