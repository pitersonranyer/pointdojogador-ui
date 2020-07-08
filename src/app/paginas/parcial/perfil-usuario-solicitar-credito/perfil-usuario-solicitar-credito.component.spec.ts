import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioSolicitarCreditoComponent } from './perfil-usuario-solicitar-credito.component';

describe('PerfilUsuarioSolicitarCreditoComponent', () => {
  let component: PerfilUsuarioSolicitarCreditoComponent;
  let fixture: ComponentFixture<PerfilUsuarioSolicitarCreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioSolicitarCreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioSolicitarCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
