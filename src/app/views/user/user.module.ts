import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { MyAccountComponent } from './components/my-account/my-account.component';



@NgModule({
  declarations: [PurchasesComponent, MyAccountComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
