import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCatalogoDeCompaniaComponent } from './nuevo-catalogo-de-compania.component';

describe('NuevoCatalogoDeCompaniaComponent', () => {
  let component: NuevoCatalogoDeCompaniaComponent;
  let fixture: ComponentFixture<NuevoCatalogoDeCompaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoCatalogoDeCompaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoCatalogoDeCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
