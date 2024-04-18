import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmFabricantesComponent } from './frm-fabricantes.component';

describe('FrmFabricantesComponent', () => {
  let component: FrmFabricantesComponent;
  let fixture: ComponentFixture<FrmFabricantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmFabricantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmFabricantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
