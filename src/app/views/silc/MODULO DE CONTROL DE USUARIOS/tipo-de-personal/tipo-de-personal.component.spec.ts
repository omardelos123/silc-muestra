import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDePersonalComponent } from './tipo-de-personal.component';

describe('TipoDePersonalComponent', () => {
  let component: TipoDePersonalComponent;
  let fixture: ComponentFixture<TipoDePersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDePersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
