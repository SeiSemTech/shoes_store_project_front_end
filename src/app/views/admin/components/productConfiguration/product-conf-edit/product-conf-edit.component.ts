import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductConfiguration } from 'src/app/core/models/product-configuration.model';
import { ProductConfigurationService } from 'src/app/core/services/productConfigurations/product-configuration.service';

@Component({
  selector: 'app-product-conf-edit',
  templateUrl: './product-conf-edit.component.html',
  styleUrls: ['./product-conf-edit.component.scss']
})
export class ProductConfEditComponent implements AfterViewInit {

  form: FormGroup;
  id: number;
  productConfiguration: ProductConfiguration;
  displayOrderPattern = '^[0-9]+$';

  constructor(
    private route: ActivatedRoute,
    private productConfigurationService: ProductConfigurationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.id = Number(route.snapshot.paramMap.get('id'));
    this.form = this.formBuilder.group({
      product_id: ['', []],
      configuration_id: ['', []],
      config_display_order: ['', [Validators.pattern(this.displayOrderPattern)]],
      sub_config_display_order: ['', [Validators.pattern(this.displayOrderPattern)]],
      stock: ['', [Validators.pattern(this.displayOrderPattern)]],
    });
  }

  ngAfterViewInit() {
    const suscribers$: any = [
      this.productConfigurationService.getProductConfigurationById(this.id)
    ];
    forkJoin(suscribers$).subscribe(
      (response: any) => {
        this.productConfiguration = response[0].product_configuration[0];
        this.buildForm();
      }
    );
  }

  private buildForm() {
    this.form.setValue(
      {
        product_id: this.productConfiguration.product_id,
        configuration_id: this.productConfiguration.configuration_id,
        config_display_order: this.productConfiguration.config_display_order,
        sub_config_display_order: this.productConfiguration.sub_config_display_order,
        stock: this.productConfiguration.stock
      }
    );
  }

  editProductConfiguration() {
    const value = this.form.value;
    const editedProductConfiguration: any = {
      id: this.id,
      product_id: value.product_id,
      configuration_id: value.configuration_id,
      config_display_order: value.config_display_order,
      sub_config_display_order: value.sub_config_display_order,
      stock: value.stock

    };
    this.productConfigurationService.updateProductConfiguration(editedProductConfiguration).subscribe(
      (response: any) => {
        this.snackBar.open('Configuración del producto actualizada', 'Cerrar', { duration: 5000 });
        this.router.navigate(['/admin/product-configurations']);
      },
      (error => {
        this.snackBar.open('Error', 'Cerrar', { duration: 5000 });
      }
      )
    );
  }


}
