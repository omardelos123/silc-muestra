import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDeCompaniaComponent } from './catalogo-de-compania.component';

describe('CatalogoDeCompaniaComponent', () => {
  let component: CatalogoDeCompaniaComponent;
  let fixture: ComponentFixture<CatalogoDeCompaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoDeCompaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoDeCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
