import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioAlterarSenhaComponent } from './perfil-usuario-alterar-senha.component';

describe('PerfilUsuarioAlterarSenhaComponent', () => {
  let component: PerfilUsuarioAlterarSenhaComponent;
  let fixture: ComponentFixture<PerfilUsuarioAlterarSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioAlterarSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioAlterarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
