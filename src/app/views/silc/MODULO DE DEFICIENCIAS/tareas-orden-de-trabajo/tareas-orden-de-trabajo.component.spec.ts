import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasOrdenDeTrabajoComponent } from './tareas-orden-de-trabajo.component';

describe('TareasOrdenDeTrabajoComponent', () => {
  let component: TareasOrdenDeTrabajoComponent;
  let fixture: ComponentFixture<TareasOrdenDeTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TareasOrdenDeTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareasOrdenDeTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
