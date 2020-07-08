import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPalpitesComponent } from './adicionar-palpites.component';

describe('AdicionarPalpitesComponent', () => {
  let component: AdicionarPalpitesComponent;
  let fixture: ComponentFixture<AdicionarPalpitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarPalpitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarPalpitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
