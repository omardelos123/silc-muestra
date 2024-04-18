import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoModelosComponent } from './nuevo-modelos.component';

describe('NuevoModelosComponent', () => {
  let component: NuevoModelosComponent;
  let fixture: ComponentFixture<NuevoModelosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoModelosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
