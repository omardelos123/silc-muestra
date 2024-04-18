import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRegistroPedidosComponent } from './nuevo-registro-pedidos.component';

describe('NuevoRegistroPedidosComponent', () => {
  let component: NuevoRegistroPedidosComponent;
  let fixture: ComponentFixture<NuevoRegistroPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRegistroPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRegistroPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
