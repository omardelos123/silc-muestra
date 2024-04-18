import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DASHBOARDNUMEROSPARTEComponent } from './dashboard-numeros-parte.component';

describe('DASHBOARDNUMEROSPARTEComponent', () => {
  let component: DASHBOARDNUMEROSPARTEComponent;
  let fixture: ComponentFixture<DASHBOARDNUMEROSPARTEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DASHBOARDNUMEROSPARTEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DASHBOARDNUMEROSPARTEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
