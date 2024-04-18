import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTextoComponent } from './buscar-texto.component';

describe('BuscarTextoComponent', () => {
  let component: BuscarTextoComponent;
  let fixture: ComponentFixture<BuscarTextoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarTextoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
