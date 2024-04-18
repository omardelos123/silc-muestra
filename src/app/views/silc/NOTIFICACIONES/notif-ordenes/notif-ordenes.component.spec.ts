import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifOrdenesComponent } from './notif-ordenes.component';

describe('NotifOrdenesComponent', () => {
  let component: NotifOrdenesComponent;
  let fixture: ComponentFixture<NotifOrdenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifOrdenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
