import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterFormComponent } from './components/register/register-form/register-form.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ForgotFormComponent } from './components/forgot/forgot-form/forgot-form.component';
import { ResetComponent } from './components/reset/reset.component';
import { ResetFormComponent } from './components/reset/reset-form/reset-form.component';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    ForgotComponent,
    ResetComponent,
    RegisterFormComponent,
    ResetFormComponent,
    ForgotFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AuthModule { }
