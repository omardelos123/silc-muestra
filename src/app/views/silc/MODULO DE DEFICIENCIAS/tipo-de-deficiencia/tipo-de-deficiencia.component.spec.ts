import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeDeficienciaComponent } from './tipo-de-deficiencia.component';

describe('TipoDeDeficienciaComponent', () => {
  let component: TipoDeDeficienciaComponent;
  let fixture: ComponentFixture<TipoDeDeficienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeDeficienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeDeficienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
