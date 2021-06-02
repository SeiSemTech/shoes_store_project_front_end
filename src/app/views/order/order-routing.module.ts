import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './components/order/order.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: 'payment',
    component: PaymentGatewayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
