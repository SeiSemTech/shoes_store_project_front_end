import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false
  public isEnabled: boolean = false

  constructor(private snackBar: MatSnackBar,  private router: Router){};

  ngOnInit() {
  }

}
