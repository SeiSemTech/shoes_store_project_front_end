import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  prod: any = [];
  id: number;
  selectOptions: string;

  subconfiguration: any[] = [];
  config: any[] = [];
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
    });
    for (const conf of this.prod.configurations) {
      this.config.push(conf.name);
      this.subconfiguration.push(conf.sub_configuration);
    }
    console.log('CC - ' + this.subconfiguration);
  }

}
