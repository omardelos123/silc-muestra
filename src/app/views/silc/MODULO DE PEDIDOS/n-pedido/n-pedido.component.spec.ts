import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NPedidoComponent } from './n-pedido.component';

describe('NPedidoComponent', () => {
  let component: NPedidoComponent;
  let fixture: ComponentFixture<NPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
