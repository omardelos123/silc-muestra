import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTipoDeMantenimientoComponent } from './nuevo-tipo-de-mantenimiento.component';

describe('NuevoTipoDeMantenimientoComponent', () => {
  let component: NuevoTipoDeMantenimientoComponent;
  let fixture: ComponentFixture<NuevoTipoDeMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTipoDeMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTipoDeMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
