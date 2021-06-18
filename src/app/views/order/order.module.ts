import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';

import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderComponent, PaymentGatewayComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class OrderModule { }
