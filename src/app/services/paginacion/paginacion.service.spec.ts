import { TestBed } from '@angular/core/testing';

import { PaginacionService } from './paginacion.service';

describe('PaginacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginacionService = TestBed.get(PaginacionService);
    expect(service).toBeTruthy();
  });
});
