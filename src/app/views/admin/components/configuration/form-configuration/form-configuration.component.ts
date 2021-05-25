import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Configuration } from 'src/app/core/models/configuration.model';
import { ConfigurationService } from 'src/app/core/services/configurations/configuration.service';

@Component({
  selector: 'app-form-configuration',
  templateUrl: './form-configuration.component.html',
  styleUrls: ['./form-configuration.component.scss']
})
export class FormConfigurationComponent implements OnInit {

  form: FormGroup;
  configuration: Configuration;
  pricePattern = '^[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private configurationService: ConfigurationService,
  ) { this.buildForm(); }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      subConfiguratuion: ['', [Validators.required]],
      extraPrice: ['', [Validators.required, Validators.pattern(this.pricePattern)]],
    });
  }

  createConfiguration(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      const newConfiguration: Configuration = {
        name: value.name,
        sub_configuration: value.subConfiguration,
        extra_price: value.extraPrice,
      };
      this.configurationService.createConfiguration(newConfiguration).subscribe(
        (response: any) => {
          if (response.status_code === 201) {
            this.snackBar.open('Configuración creada exitosamente', 'cerrar', { duration: 5000 });
            this.router.navigate(['/configurations']);
          } else {
            this.snackBar.open('No es posible crear esta configuración.', 'cerrar', { duration: 5000 });
          }
        },
        (error: any) => {
          console.log(error);
          this.snackBar.open('Ha ocurrido un error inesperado.', 'cerrar', { duration: 5000 });
        }
      );
    }
  }

}
