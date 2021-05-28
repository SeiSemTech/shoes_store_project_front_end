import { TestBed } from '@angular/core/testing';

import { ProductBuyerDetailService } from './product-buyer-detail.service';

describe('ProductBuyerDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductBuyerDetailService = TestBed.get(ProductBuyerDetailService);
    expect(service).toBeTruthy();
  });
});
