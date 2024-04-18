import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisisionesComponent } from './requisisiones.component';

describe('RequisisionesComponent', () => {
  let component: RequisisionesComponent;
  let fixture: ComponentFixture<RequisisionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
