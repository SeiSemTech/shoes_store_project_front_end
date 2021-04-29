import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterService } from 'src/app/core/services/auth/register/register.service';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss']
})
export class ResetFormComponent implements OnInit {

  isPasswordHidden = true;
  isConfirmationHidden = true;

  constructor() { }

  ngOnInit() {
  }
}
