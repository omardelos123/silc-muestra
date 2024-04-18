import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarExcelCatalogoComponent } from './cargar-excel-catalogo.component';

describe('CargarExcelCatalogoComponent', () => {
  let component: CargarExcelCatalogoComponent;
  let fixture: ComponentFixture<CargarExcelCatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarExcelCatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarExcelCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
