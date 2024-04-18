import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmCompaniasComponent } from './frm-companias.component';

describe('FrmCompaniasComponent', () => {
  let component: FrmCompaniasComponent;
  let fixture: ComponentFixture<FrmCompaniasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmCompaniasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmCompaniasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
