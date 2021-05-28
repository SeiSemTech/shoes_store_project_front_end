import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductsComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        ProductRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        MatTabsModule,
        FormsModule
    ]
})
export class ProductModule { }
