import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaOrdenDeTrabajoComponent } from './nueva-orden-de-trabajo.component';

describe('NuevaOrdenDeTrabajoComponent', () => {
  let component: NuevaOrdenDeTrabajoComponent;
  let fixture: ComponentFixture<NuevaOrdenDeTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaOrdenDeTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaOrdenDeTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
