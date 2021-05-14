import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/core/services/auth/login/login.service';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.scss']
})
export class ForgotFormComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router,
              private loginService: LoginService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  getPassword() {
    const value = this.form.value;
    const email = value.email;
    if (email) {
      this.loginService.getPassword(email).subscribe(
        (response: any) => {
          this.snackBar.open('Se enviaron las instrucciones de restablecimiento al correo');
          window.localStorage.setItem('email', email);
          this.router.navigate(['/home']);
        }, (error) => {
          this.snackBar.open('Ocurrio un error inesperado');
        }
      );
    }
  }
}
