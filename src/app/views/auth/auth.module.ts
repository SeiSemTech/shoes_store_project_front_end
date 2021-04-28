import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotComponent } from './components/login/forgot/forgot.component';


import { MaterialModule } from '../../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { RegisterFormComponent } from './components/register/register-form/register-form.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent, RegisterComponent, ForgotComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
