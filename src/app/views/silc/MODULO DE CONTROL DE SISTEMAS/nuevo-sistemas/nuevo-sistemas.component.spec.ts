import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoSistemasComponent } from './nuevo-sistemas.component';

describe('NuevoSistemasComponent', () => {
  let component: NuevoSistemasComponent;
  let fixture: ComponentFixture<NuevoSistemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoSistemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
