import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaUnidadesComponent } from './nueva-unidades.component';

describe('NuevaUnidadesComponent', () => {
  let component: NuevaUnidadesComponent;
  let fixture: ComponentFixture<NuevaUnidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaUnidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
