import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDistritoComponent } from './nuevo-distrito.component';

describe('NuevoDistritoComponent', () => {
  let component: NuevoDistritoComponent;
  let fixture: ComponentFixture<NuevoDistritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDistritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
