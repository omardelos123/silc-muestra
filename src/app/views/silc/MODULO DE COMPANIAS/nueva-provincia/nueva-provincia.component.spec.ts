import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaProvinciaComponent } from './nueva-provincia.component';

describe('NuevaProvinciaComponent', () => {
  let component: NuevaProvinciaComponent;
  let fixture: ComponentFixture<NuevaProvinciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaProvinciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaProvinciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
