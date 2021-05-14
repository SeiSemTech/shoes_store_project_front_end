import { TestBed } from '@angular/core/testing';

import { ProductConfigurationService } from './product-configuration.service';

describe('ProductConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductConfigurationService = TestBed.get(ProductConfigurationService);
    expect(service).toBeTruthy();
  });
});
