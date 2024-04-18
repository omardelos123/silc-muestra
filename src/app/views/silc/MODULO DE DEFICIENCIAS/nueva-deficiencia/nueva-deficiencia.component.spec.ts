import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaDeficienciaComponent } from './nueva-deficiencia.component';

describe('NuevaDeficienciaComponent', () => {
  let component: NuevaDeficienciaComponent;
  let fixture: ComponentFixture<NuevaDeficienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaDeficienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaDeficienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
