import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDeficienciaComponent } from './dashboard-deficiencia.component';

describe('DashboardDeficienciaComponent', () => {
  let component: DashboardDeficienciaComponent;
  let fixture: ComponentFixture<DashboardDeficienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDeficienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDeficienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
