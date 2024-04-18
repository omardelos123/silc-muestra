import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonNotificacionesComponent } from './boton-notificaciones.component';

describe('BotonNotificacionesComponent', () => {
  let component: BotonNotificacionesComponent;
  let fixture: ComponentFixture<BotonNotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotonNotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
