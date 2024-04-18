import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaFormaDePagoComponent } from './nueva-forma-de-pago.component';

describe('NuevaFormaDePagoComponent', () => {
  let component: NuevaFormaDePagoComponent;
  let fixture: ComponentFixture<NuevaFormaDePagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaFormaDePagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaFormaDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
