import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoDestinosComponent } from './nuevo-destinos.component';

describe('NuevoDestinosComponent', () => {
  let component: NuevoDestinosComponent;
  let fixture: ComponentFixture<NuevoDestinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoDestinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
