import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SILCComponent } from './silc.component';

describe('SILCComponent', () => {
  let component: SILCComponent;
  let fixture: ComponentFixture<SILCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SILCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SILCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
