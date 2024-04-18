import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoMenuComponent } from './nuevo-menu.component';

describe('NuevoMenuComponent', () => {
  let component: NuevoMenuComponent;
  let fixture: ComponentFixture<NuevoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
