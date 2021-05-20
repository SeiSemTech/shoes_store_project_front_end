import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Configuration } from 'src/app/core/models/configuration.model';
import { ConfigurationService } from 'src/app/core/services/configurations/configuration.service';

@Component({
  selector: 'app-configuration-edit',
  templateUrl: './configuration-edit.component.html',
  styleUrls: ['./configuration-edit.component.scss']
})
export class ConfigurationEditComponent implements AfterViewInit {

  form: FormGroup;
  id: number;
  configuration: Configuration;
  pricePattern = '^[0-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*$';

  constructor(
    private route: ActivatedRoute,
    private configurationService: ConfigurationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.id = Number(route.snapshot.paramMap.get('id'));
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      sub_configuration: ['', [Validators.required]],
      extra_price: ['', [Validators.required, Validators.pattern(this.pricePattern)]],
    });

  }

  ngAfterViewInit() {
    const suscribers$: any = [
      this.configurationService.getConfigurationById(this.id)
    ];
    forkJoin(suscribers$).subscribe(
      (response: any) => {
        this.configuration = response[1].product[0];
        this.buildForm();
      }
    );
  }

  private buildForm() {
    this.form.setValue(
      {
        name: this.configuration.name,
        sub_configuration: this.configuration.sub_configuratuion,
        extra_price: this.configuration.extra_price
      }
    );
  }

  editConfiguration() {
    const value = this.form.value;
    const editedConfiguration: any = {
      id: this.id,
      name: value.name,
      sub_configuration: value.sub_configuration,
      extra_price: value.extra_price
    };
    this.configurationService.updateConfiguration(editedConfiguration).subscribe(
      (response: any) => {
        this.snackBar.open('Configuración actualizada', 'Cerrar', { duration: 5000 });
        this.router.navigate(['/admin/configurations']);
      },
      (error => {
        this.snackBar.open('Error', 'Cerrar', { duration: 5000 });
      }
      )
    );
  }
}
