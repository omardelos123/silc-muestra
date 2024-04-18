import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaTareasOrdenDeTrabajoComponent } from './nueva-tareas-orden-de-trabajo.component';

describe('NuevaTareasOrdenDeTrabajoComponent', () => {
  let component: NuevaTareasOrdenDeTrabajoComponent;
  let fixture: ComponentFixture<NuevaTareasOrdenDeTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaTareasOrdenDeTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaTareasOrdenDeTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
