import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOperadorComponent } from './reporte-operador.component';

describe('ReporteOperadorComponent', () => {
  let component: ReporteOperadorComponent;
  let fixture: ComponentFixture<ReporteOperadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteOperadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
