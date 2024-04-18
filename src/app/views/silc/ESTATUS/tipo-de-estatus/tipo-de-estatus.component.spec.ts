import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeEstatusComponent } from './tipo-de-estatus.component';

describe('TipoDeEstatusComponent', () => {
  let component: TipoDeEstatusComponent;
  let fixture: ComponentFixture<TipoDeEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
