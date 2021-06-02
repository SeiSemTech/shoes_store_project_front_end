import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { PurchasesComponent } from './components/purchases/purchases.component';

import { LoginGuard } from 'src/app/utils/guards/login/login.guard';
import { UserGuard } from 'src/app/utils/guards/user/user.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [UserGuard, LoginGuard],
    component: UserComponent,
  },
  {
    path: 'purchases',
    canActivate: [UserGuard, LoginGuard],
    component: PurchasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
