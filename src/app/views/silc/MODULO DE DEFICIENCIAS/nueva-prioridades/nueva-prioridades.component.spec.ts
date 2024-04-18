import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaPrioridadesComponent } from './nueva-prioridades.component';

describe('NuevaPrioridadesComponent', () => {
  let component: NuevaPrioridadesComponent;
  let fixture: ComponentFixture<NuevaPrioridadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaPrioridadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaPrioridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
