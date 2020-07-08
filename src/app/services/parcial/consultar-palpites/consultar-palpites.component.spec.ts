import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPalpitesComponent } from './consultar-palpites.component';

describe('ConsultarPalpitesComponent', () => {
  let component: ConsultarPalpitesComponent;
  let fixture: ComponentFixture<ConsultarPalpitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarPalpitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPalpitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
