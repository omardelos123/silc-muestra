import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenCompaniaComponent } from './almacen-compania.component';

describe('AlmacenCompaniaComponent', () => {
  let component: AlmacenCompaniaComponent;
  let fixture: ComponentFixture<AlmacenCompaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenCompaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
