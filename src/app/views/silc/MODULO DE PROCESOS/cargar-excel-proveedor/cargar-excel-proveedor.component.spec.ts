import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarExcelProveedorComponent } from './cargar-excel-proveedor.component';

describe('CargarExcelProveedorComponent', () => {
  let component: CargarExcelProveedorComponent;
  let fixture: ComponentFixture<CargarExcelProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarExcelProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarExcelProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
