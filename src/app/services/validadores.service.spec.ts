import { TestBed } from '@angular/core/testing';

import { ValidadoresService } from './validadores.service';

describe('ValidadoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidadoresService = TestBed.get(ValidadoresService);
    expect(service).toBeTruthy();
  });
});
