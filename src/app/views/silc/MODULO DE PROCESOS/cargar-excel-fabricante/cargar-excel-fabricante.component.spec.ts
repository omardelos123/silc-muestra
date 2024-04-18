import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarExcelFabricanteComponent } from './cargar-excel-fabricante.component';

describe('CargarExcelFabricanteComponent', () => {
  let component: CargarExcelFabricanteComponent;
  let fixture: ComponentFixture<CargarExcelFabricanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarExcelFabricanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarExcelFabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
