import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaUbicacionComponent } from './nueva-ubicacion.component';

describe('NuevaUbicacionComponent', () => {
  let component: NuevaUbicacionComponent;
  let fixture: ComponentFixture<NuevaUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
