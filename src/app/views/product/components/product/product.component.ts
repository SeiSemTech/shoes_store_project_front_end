import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

export class ProductComponent implements OnInit, OnDestroy {

  @Input() product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();
  today = new Date();

  constructor(
    private router: Router
  ) {
    console.log('1. constructor');
  }

  ngOnInit() {
    console.log('3. ngOnInit');
  }

  ngOnDestroy() {
    console.log('5. ngOnDestroy');
  }

  // updateConfigSelected() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // public resolveRoute() {
  //   const baseUrl = environment.baseUrl;
  //   return ${ baseUrl } /foto_producto/${ this.producto.foto };
  // }

}
