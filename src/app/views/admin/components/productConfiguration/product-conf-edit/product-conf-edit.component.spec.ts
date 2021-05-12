import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfEditComponent } from './product-conf-edit.component';

describe('ProductConfEditComponent', () => {
  let component: ProductConfEditComponent;
  let fixture: ComponentFixture<ProductConfEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
