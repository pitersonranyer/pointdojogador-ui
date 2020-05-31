import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarCartelaComponent } from './cadastrar-cartela.component';

describe('CadastrarCartelaComponent', () => {
  let component: CadastrarCartelaComponent;
  let fixture: ComponentFixture<CadastrarCartelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarCartelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarCartelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
