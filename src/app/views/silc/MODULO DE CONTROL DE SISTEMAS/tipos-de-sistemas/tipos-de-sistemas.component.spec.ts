import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDeSistemasComponent } from './tipos-de-sistemas.component';

describe('TiposDeSistemasComponent', () => {
  let component: TiposDeSistemasComponent;
  let fixture: ComponentFixture<TiposDeSistemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposDeSistemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposDeSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
