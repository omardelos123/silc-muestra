import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarExcelPosibleFallaComponent } from './cargar-excel-posible-falla.component';

describe('CargarExcelPosibleFallaComponent', () => {
  let component: CargarExcelPosibleFallaComponent;
  let fixture: ComponentFixture<CargarExcelPosibleFallaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarExcelPosibleFallaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarExcelPosibleFallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
