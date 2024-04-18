import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPaisComponent } from './nuevo-pais.component';

describe('NuevoPaisComponent', () => {
  let component: NuevoPaisComponent;
  let fixture: ComponentFixture<NuevoPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
