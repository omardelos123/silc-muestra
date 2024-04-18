import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAlmacenCompaniaComponent } from './nuevo-almacen-compania.component';

describe('NuevoAlmacenCompaniaComponent', () => {
  let component: NuevoAlmacenCompaniaComponent;
  let fixture: ComponentFixture<NuevoAlmacenCompaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoAlmacenCompaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAlmacenCompaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
