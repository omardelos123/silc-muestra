import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSistemaComponent } from './reporte-sistema.component';

describe('ReporteSistemaComponent', () => {
  let component: ReporteSistemaComponent;
  let fixture: ComponentFixture<ReporteSistemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteSistemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
