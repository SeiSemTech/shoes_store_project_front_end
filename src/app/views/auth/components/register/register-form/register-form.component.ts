import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { RegisterService } from 'src/app/core/services/auth/register/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  form: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  phonePattern = '^(\\+?\d{1,4}[\s-])?(?!0+\s+,?$)\\d{10}\s*,?$'

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  createUser(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.registerService.registerUser(value.fullname, value.email, value.phone).subscribe(
        (response: any) => {
          if (response.status_code === 201) {
            this.router.navigate(['/home']);
            window.localStorage.setItem('email', value.email);
            this.snackBar.open('Usuario registrado, verificar el correo', 'cerrar', { duration: 2000 });
          } else {
            this.snackBar.open('El usuario ya existe', 'cerrar', { duration: 2000 });
          }
        },
        (error: any) => { console.log(error); this.snackBar.open('Error inesperado.', 'cerrar', { duration: 2000 }) }
      );
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
    });
  }

  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }

}
