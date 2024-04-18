import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPedidosComponent } from './dashboard-pedidos.component';

describe('DashboardPedidosComponent', () => {
  let component: DashboardPedidosComponent;
  let fixture: ComponentFixture<DashboardPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
