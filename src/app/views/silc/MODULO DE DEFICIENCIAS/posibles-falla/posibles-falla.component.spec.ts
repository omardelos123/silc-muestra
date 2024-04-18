import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosiblesFallaComponent } from './posibles-falla.component';

describe('PosiblesFallaComponent', () => {
  let component: PosiblesFallaComponent;
  let fixture: ComponentFixture<PosiblesFallaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosiblesFallaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosiblesFallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
