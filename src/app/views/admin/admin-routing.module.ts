import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
//Products
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductsListComponent } from './components/products/product-list/products-list.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
//Categories
import { FormCategoryComponent } from './components/categories/form-category/form-category.component'
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { ConfigurationListComponent } from './components/configuration/configuration-list/configuration-list.component';
import { FormConfigurationComponent } from './components/configuration/form-configuration/form-configuration.component';
import { ProductConfListComponent } from './components/productConfiguration/product-conf-list/product-conf-list.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { ConfigurationEditComponent } from './components/configuration/configuration-edit/configuration-edit.component';
import { FormProductConfComponent } from './components/productConfiguration/form-product-conf/form-product-conf.component';
import { ProductConfEditComponent } from './components/productConfiguration/product-conf-edit/product-conf-edit.component';
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
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'categories/create',
    component: FormCategoryComponent
  },
  {
    path: 'categories/edit',
    component: CategoryEditComponent
  },
  {
    path: 'configurations',
    component: ConfigurationListComponent
  },
  {
    path: 'configurations/create',
    component: FormConfigurationComponent
  },
  {
    path: 'configurations/edit',
    component: ConfigurationEditComponent
  },
  {
    path: 'product-configurations',
    component: ProductConfListComponent
  },
  {
    path: 'product-configurations/create',
    component: FormProductConfComponent
  },
  {
    path: 'product-configurations/edit',
    component: ProductConfEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
