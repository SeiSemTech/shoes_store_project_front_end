import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CompleteConfiguration, Configuration, NamedCompleteConfiguration } from 'src/app/core/models/configuration.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();
  public configurations: NamedCompleteConfiguration[] = [];
  public selectedConfiguration: NamedCompleteConfiguration[] = [];

  stock = 0;
  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.compileConfigurations();
  }

  addCart() {
    let isConfigurationCompleted = true;
    for (const config of this.selectedConfiguration) {
      if (!config.configuration) {
        isConfigurationCompleted = false;
      }
    }

    if (this.stock > 0 && isConfigurationCompleted) {
      const currentProduct = this.product;
      currentProduct.configurations = this.selectedConfiguration;
      this.cartService.addCart(currentProduct);
    }
  }

  compileConfigurations() {
    const configurations: CompleteConfiguration[] = this.product.configurations;
    const uniqueConfigName: string[] = [...new Set(configurations.map(configuration => configuration.name))];
    for (const uniqueKey of uniqueConfigName) {
      const normalConfiguration: Configuration[] = [];
      for (const configuration of configurations) {
        if (uniqueKey === configuration.name) {
          normalConfiguration.push({
            name: configuration.name,
            sub_configuration: configuration.sub_configuration,
            extra_price: configuration.extra_price
          });
        }
      }
      this.configurations.push({ name: uniqueKey, configuration: normalConfiguration });
      this.selectedConfiguration.push({ name: uniqueKey });
    }
  }
}
