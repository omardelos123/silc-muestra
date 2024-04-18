import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeMantenimientoComponent } from './tipo-de-mantenimiento.component';

describe('TipoDeMantenimientoComponent', () => {
  let component: TipoDeMantenimientoComponent;
  let fixture: ComponentFixture<TipoDeMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
