import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTipoDePersonalComponent } from './nuevo-tipo-de-personal.component';

describe('NuevoTipoDePersonalComponent', () => {
  let component: NuevoTipoDePersonalComponent;
  let fixture: ComponentFixture<NuevoTipoDePersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTipoDePersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTipoDePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
