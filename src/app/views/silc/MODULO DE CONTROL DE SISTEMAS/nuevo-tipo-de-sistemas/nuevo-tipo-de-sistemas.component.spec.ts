import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTipoDeSistemasComponent } from './nuevo-tipo-de-sistemas.component';

describe('NuevoTipoDeSistemasComponent', () => {
  let component: NuevoTipoDeSistemasComponent;
  let fixture: ComponentFixture<NuevoTipoDeSistemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTipoDeSistemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTipoDeSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
