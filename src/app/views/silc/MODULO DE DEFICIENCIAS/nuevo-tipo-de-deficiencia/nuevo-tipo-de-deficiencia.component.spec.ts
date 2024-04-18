import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTipoDeDeficienciaComponent } from './nuevo-tipo-de-deficiencia.component';

describe('NuevoTipoDeDeficienciaComponent', () => {
  let component: NuevoTipoDeDeficienciaComponent;
  let fixture: ComponentFixture<NuevoTipoDeDeficienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTipoDeDeficienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTipoDeDeficienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
