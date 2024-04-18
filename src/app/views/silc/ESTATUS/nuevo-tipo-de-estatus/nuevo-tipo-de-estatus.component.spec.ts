import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTipoDeEstatusComponent } from './nuevo-tipo-de-estatus.component';

describe('NuevoTipoDeEstatusComponent', () => {
  let component: NuevoTipoDeEstatusComponent;
  let fixture: ComponentFixture<NuevoTipoDeEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoTipoDeEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTipoDeEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
