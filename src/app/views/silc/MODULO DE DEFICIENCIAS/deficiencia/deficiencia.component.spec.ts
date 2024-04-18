import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeficienciaComponent } from './deficiencia.component';

describe('DeficienciaComponent', () => {
  let component: DeficienciaComponent;
  let fixture: ComponentFixture<DeficienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeficienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeficienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
