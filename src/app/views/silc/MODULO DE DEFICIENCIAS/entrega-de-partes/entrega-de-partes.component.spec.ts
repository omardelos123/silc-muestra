import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaDePartesComponent } from './entrega-de-partes.component';

describe('EntregaDePartesComponent', () => {
  let component: EntregaDePartesComponent;
  let fixture: ComponentFixture<EntregaDePartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaDePartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaDePartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
