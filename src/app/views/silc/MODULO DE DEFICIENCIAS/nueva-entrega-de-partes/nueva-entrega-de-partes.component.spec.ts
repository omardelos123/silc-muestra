import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEntregaDePartesComponent } from './nueva-entrega-de-partes.component';

describe('NuevaEntregaDePartesComponent', () => {
  let component: NuevaEntregaDePartesComponent;
  let fixture: ComponentFixture<NuevaEntregaDePartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaEntregaDePartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaEntregaDePartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
