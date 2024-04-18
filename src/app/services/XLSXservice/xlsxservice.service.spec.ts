import { TestBed } from '@angular/core/testing';

import { XLSXserviceService } from './xlsxservice.service';

describe('XLSXserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XLSXserviceService = TestBed.get(XLSXserviceService);
    expect(service).toBeTruthy();
  });
});
