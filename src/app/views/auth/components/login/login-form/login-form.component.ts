import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { LoginService } from '../../../../../core/services/auth/login/login.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.loginService.login(value.email, value.password).subscribe(
        (response: any) => {
          if (response.token) {
            this.loginService.loginJWT(response.token);
            this.router.navigate(['/admin']);
            this.snackBar.open('Has iniciado sesión exitosamente.', 'Cerrar', { duration: 5000 })
          } else {
            this.snackBar.open('Correo o contraseña incorrectos.', 'Cerrar', { duration: 2000 })
          }
        },
        (error: any) => {
          this.snackBar.open('Ocurrió un error inesperado.', 'Cerrar', { duration: 2000 })
        }
      );
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
}
