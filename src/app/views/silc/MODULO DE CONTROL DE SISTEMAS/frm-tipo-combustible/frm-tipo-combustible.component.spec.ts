import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmTipoCombustibleComponent } from './frm-tipo-combustible.component';

describe('FrmTipoCombustibleComponent', () => {
  let component: FrmTipoCombustibleComponent;
  let fixture: ComponentFixture<FrmTipoCombustibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmTipoCombustibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmTipoCombustibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
