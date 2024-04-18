import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCompaniaComponent } from './nueva-compania.component';

describe('NuevaCompaniaComponent', () => {
  let component: NuevaCompaniaComponent;
  let fixture: ComponentFixture<NuevaCompaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaCompaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
