import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifMantenimientoComponent } from './notif-mantenimiento.component';

describe('NotifMantenimientoComponent', () => {
  let component: NotifMantenimientoComponent;
  let fixture: ComponentFixture<NotifMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
