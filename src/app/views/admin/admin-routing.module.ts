import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
// Products
import { FormProductComponent } from './components/products/form-product/form-product.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ProductsListComponent } from './components/products/product-list/products-list.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
// Categories
import { FormCategoryComponent } from './components/categories/form-category/form-category.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { ConfigurationListComponent } from './components/configuration/configuration-list/configuration-list.component';
import { FormConfigurationComponent } from './components/configuration/form-configuration/form-configuration.component';
import { ProductConfListComponent } from './components/productConfiguration/product-conf-list/product-conf-list.component';
import { CategoryEditComponent } from './components/categories/category-edit/category-edit.component';
import { ConfigurationEditComponent } from './components/configuration/configuration-edit/configuration-edit.component';
import { FormProductConfComponent } from './components/productConfiguration/form-product-conf/form-product-conf.component';
import { ProductConfEditComponent } from './components/productConfiguration/product-conf-edit/product-conf-edit.component';
import { LoginGuard } from 'src/app/utils/guards/login/login.guard';
import { AdminGuard } from 'src/app/utils/guards/admin/admin.guard';
import {SalesListComponent} from 'src/app/views/admin/components/sales/sales-list/sales-list.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard, LoginGuard],
    component: AdminComponent,
  },
  {
    path: 'create',
    canActivate: [AdminGuard, LoginGuard],
    component: ProductFormComponent
  },
  {
    path: 'products',
    canActivate: [AdminGuard, LoginGuard],
    component: ProductsListComponent
  },
  {
    path: 'products/create',
    canActivate: [AdminGuard, LoginGuard],
    component: FormProductComponent
  },
  {
    path: 'products/edit/:id',
    canActivate: [AdminGuard, LoginGuard],
    component: ProductEditComponent
  },
  {
    path: 'categories',
    canActivate: [AdminGuard, LoginGuard],
    component: CategoryListComponent
  },
  {
    path: 'sales',
    canActivate: [AdminGuard, LoginGuard],
    component: SalesListComponent
  },
  {
    path: 'categories/create',
    canActivate: [AdminGuard, LoginGuard],
    component: FormCategoryComponent
  },
  {
    path: 'categories/edit/:id',
    canActivate: [AdminGuard, LoginGuard],
    component: CategoryEditComponent
  },
  {
    path: 'configurations',
    canActivate: [AdminGuard, LoginGuard],
    component: ConfigurationListComponent
  },
  {
    path: 'configurations/create',
    canActivate: [AdminGuard, LoginGuard],
    component: FormConfigurationComponent
  },
  {
    path: 'configurations/edit/:id',
    canActivate: [AdminGuard, LoginGuard],
    component: ConfigurationEditComponent
  },
  {
    path: 'product-configurations',
    canActivate: [AdminGuard, LoginGuard],
    component: ProductConfListComponent
  },
  {
    path: 'product-configurations/create',
    canActivate: [AdminGuard, LoginGuard],
    component: FormProductConfComponent
  },
  {
    path: 'product-configurations/edit/:id',
    canActivate: [AdminGuard, LoginGuard],
    component: ProductConfEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
