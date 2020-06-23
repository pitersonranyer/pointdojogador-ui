import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPalpitesModalComponent } from './consulta-palpites-modal.component';

describe('ConsultaPalpitesModalComponent', () => {
  let component: ConsultaPalpitesModalComponent;
  let fixture: ComponentFixture<ConsultaPalpitesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaPalpitesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPalpitesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
