import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEstatusComponent } from './nuevo-estatus.component';

describe('NuevoEstatusComponent', () => {
  let component: NuevoEstatusComponent;
  let fixture: ComponentFixture<NuevoEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
