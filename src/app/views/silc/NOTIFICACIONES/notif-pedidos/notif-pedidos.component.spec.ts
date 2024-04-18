import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifPedidosComponent } from './notif-pedidos.component';

describe('NotifPedidosComponent', () => {
  let component: NotifPedidosComponent;
  let fixture: ComponentFixture<NotifPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
