import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGastoEquipoComponent } from './reporte-gasto-equipo.component';

describe('ReporteGastoEquipoComponent', () => {
  let component: ReporteGastoEquipoComponent;
  let fixture: ComponentFixture<ReporteGastoEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteGastoEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteGastoEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
