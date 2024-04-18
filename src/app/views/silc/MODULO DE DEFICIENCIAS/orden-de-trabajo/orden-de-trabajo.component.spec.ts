import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDeTrabajoComponent } from './orden-de-trabajo.component';

describe('OrdenDeTrabajoComponent', () => {
  let component: OrdenDeTrabajoComponent;
  let fixture: ComponentFixture<OrdenDeTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenDeTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDeTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
