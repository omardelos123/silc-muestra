import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirPedidosComponent } from './recibir-pedidos.component';

describe('RecibirPedidosComponent', () => {
  let component: RecibirPedidosComponent;
  let fixture: ComponentFixture<RecibirPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibirPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibirPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
