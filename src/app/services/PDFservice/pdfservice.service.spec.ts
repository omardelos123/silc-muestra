import { TestBed } from '@angular/core/testing';

import { PDFserviceService } from './pdfservice.service';

describe('PDFserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PDFserviceService = TestBed.get(PDFserviceService);
    expect(service).toBeTruthy();
  });
});
