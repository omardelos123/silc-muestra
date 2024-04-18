import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmPosiblesFallaComponent } from './frm-posibles-falla.component';

describe('FrmPosiblesFallaComponent', () => {
  let component: FrmPosiblesFallaComponent;
  let fixture: ComponentFixture<FrmPosiblesFallaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmPosiblesFallaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmPosiblesFallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
