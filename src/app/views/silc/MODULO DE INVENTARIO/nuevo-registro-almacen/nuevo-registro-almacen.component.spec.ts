import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRegistroAlmacenComponent } from './nuevo-registro-almacen.component';

describe('NuevoRegistroAlmacenComponent', () => {
  let component: NuevoRegistroAlmacenComponent;
  let fixture: ComponentFixture<NuevoRegistroAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRegistroAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRegistroAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
