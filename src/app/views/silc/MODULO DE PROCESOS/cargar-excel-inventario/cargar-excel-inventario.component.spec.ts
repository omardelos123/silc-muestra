import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarExcelInventarioComponent } from './cargar-excel-inventario.component';

describe('CargarExcelInventarioComponent', () => {
  let component: CargarExcelInventarioComponent;
  let fixture: ComponentFixture<CargarExcelInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarExcelInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarExcelInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
