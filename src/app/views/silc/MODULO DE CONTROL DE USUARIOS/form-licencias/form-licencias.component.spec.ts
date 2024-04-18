import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLicenciasComponent } from './form-licencias.component';

describe('FormLicenciasComponent', () => {
  let component: FormLicenciasComponent;
  let fixture: ComponentFixture<FormLicenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormLicenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLicenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
