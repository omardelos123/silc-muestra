import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaRequisisionesComponent } from './nueva-requisisiones.component';

describe('NuevaRequisisionesComponent', () => {
  let component: NuevaRequisisionesComponent;
  let fixture: ComponentFixture<NuevaRequisisionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaRequisisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaRequisisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
