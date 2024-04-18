import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCombustiblesComponent } from './nuevo-combustibles.component';

describe('NuevoCombustiblesComponent', () => {
  let component: NuevoCombustiblesComponent;
  let fixture: ComponentFixture<NuevoCombustiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoCombustiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoCombustiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
