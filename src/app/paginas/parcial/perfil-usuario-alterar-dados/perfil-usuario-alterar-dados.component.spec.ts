import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioAlterarDadosComponent } from './perfil-usuario-alterar-dados.component';

describe('PerfilUsuarioAlterarDadosComponent', () => {
  let component: PerfilUsuarioAlterarDadosComponent;
  let fixture: ComponentFixture<PerfilUsuarioAlterarDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioAlterarDadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioAlterarDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
