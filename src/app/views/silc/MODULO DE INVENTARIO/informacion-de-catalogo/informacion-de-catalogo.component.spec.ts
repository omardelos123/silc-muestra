import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionDeCatalogoComponent } from './informacion-de-catalogo.component';

describe('InformacionDeCatalogoComponent', () => {
  let component: InformacionDeCatalogoComponent;
  let fixture: ComponentFixture<InformacionDeCatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionDeCatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionDeCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
