import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductsListComponent } from './components/products/product-list/products-list.component';
import { FormCategoryComponent } from './components/categories/form-category/form-category.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { ConfigurationEditComponent } from './components/configuration/configuration-edit/configuration-edit.component';
import { ConfigurationListComponent } from './components/configuration/configuration-list/configuration-list.component';
import { FormConfigurationComponent } from './components/configuration/form-configuration/form-configuration.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { ProductConfListComponent } from './components/productConfiguration/product-conf-list/product-conf-list.component';
import { ProductConfEditComponent } from './components/productConfiguration/product-conf-edit/product-conf-edit.component';
import { FormProductConfComponent } from './components/productConfiguration/form-product-conf/form-product-conf.component';
import { SalesListComponent } from 'src/app/views/admin/components/sales/sales-list/sales-list.component';

@NgModule({
  declarations: [
    AdminComponent,
    FormProductComponent,
    ProductEditComponent,
    ProductFormComponent,
    ProductsListComponent,
    FormCategoryComponent,
    CategoryEditComponent,
    CategoryListComponent,
    ConfigurationEditComponent,
    ConfigurationListComponent,
    FormConfigurationComponent,
    ProductConfListComponent,
    ProductConfEditComponent,
    FormProductConfComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdminModule { }
