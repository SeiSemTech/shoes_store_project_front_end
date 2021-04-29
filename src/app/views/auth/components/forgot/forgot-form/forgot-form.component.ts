import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.scss']
})
export class ForgotFormComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
