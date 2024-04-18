import { TestBed } from '@angular/core/testing';

import { ConexionSocketService } from './conexion-socket.service';

describe('ConexionSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConexionSocketService = TestBed.get(ConexionSocketService);
    expect(service).toBeTruthy();
  });
});
