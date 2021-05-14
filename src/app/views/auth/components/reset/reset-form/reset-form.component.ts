import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { RegisterService } from 'src/app/core/services/auth/register/register.service';
import {LoginService} from 'src/app/core/services/auth/login/login.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss']
})
export class ResetFormComponent implements OnInit {

  private token: string;
  isPasswordHidden = true;
  isConfirmationHidden = true;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private loginService: LoginService, private formBuilder: FormBuilder,
              private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.token = this.route.snapshot.paramMap.get('token');
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmation: ['', [Validators.required]],
    }, { validators: this.checkPasswords});
  }

  public checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmation').value;

    return password === confirmPassword ? null : { notSame: true };
  }

  public changeOrCreatePassword() {
    const value = this.form.value;
    const password = value.password;
    console.log(password);
    if (password) {
      this.loginService.setPassword(password, this.token).subscribe(
        (response: any) => {
          this.snackBar.open('Contraseña cambiada correctamente');
          this.router.navigate(['/auth/login']);
        }, (error) => {
          this.snackBar.open('Ocurrio un error inesperado');
        }
      );
    }
  }
}
