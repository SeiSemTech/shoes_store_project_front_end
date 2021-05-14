import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductConfComponent } from './form-product-conf.component';

describe('FormProductConfComponent', () => {
  let component: FormProductConfComponent;
  let fixture: ComponentFixture<FormProductConfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductConfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductConfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
