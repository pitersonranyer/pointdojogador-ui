import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BemVindoComponent } from './paginas/publico/bem-vindo/bem-vindo.component';
import { LoginComponent } from './paginas/publico/login/login.component';
import { CadastroComponent } from './paginas/publico/cadastro/cadastro.component';
import { DashboardComponent } from './paginas/parcial/dashboard/dashboard.component';
import { JogadorComponent } from './paginas/parcial/jogador/jogador.component';
import { AlterarJogadorComponent } from './paginas/parcial/alterar-jogador/alterar-jogador.component';
import { AdicionarPalpitesComponent } from './paginas/parcial/adicionar-palpites/adicionar-palpites.component';
import { AdministradorComponent } from './paginas/parcial/administrador/administrador.component';
import { CadastrarCartelaComponent } from './paginas/parcial/cadastrar-cartela/cadastrar-cartela.component';
import { CadastrarJogosComponent } from './paginas/parcial/cadastrar-jogos/cadastrar-jogos.component';
import { ConsultarPalpitesComponent } from './paginas/parcial/consultar-palpites/consultar-palpites.component';
import { PerfilUsuarioComponent } from './paginas/parcial/perfil-usuario/perfil-usuario.component';
import { PerfilUsuarioAlterarSenhaComponent } from './paginas/parcial/perfil-usuario-alterar-senha/perfil-usuario-alterar-senha.component';
// tslint:disable-next-line: max-line-length
import { PerfilUsuarioSolicitarCreditoComponent } from './paginas/parcial/perfil-usuario-solicitar-credito/perfil-usuario-solicitar-credito.component';
import { PerfilUsuarioAlterarDadosComponent } from './paginas/parcial/perfil-usuario-alterar-dados/perfil-usuario-alterar-dados.component';
// tslint:disable-next-line: max-line-length
import { ListarPendenciaSaldoUsuarioComponent } from './paginas/parcial/listar-penencia-saldo-usuario/listar-pendencia-saldo-usuario.component';
import { ListarUsuariosComponent } from './paginas/parcial/listar-usuarios/listar-usuarios.component';
import { ListarResultadoParcialComponent } from './paginas/parcial/listar-resultado-parcial/listar-resultado-parcial.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BemVindoComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: 'jogador',
    component: JogadorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'alterarJogador',
    component: AlterarJogadorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'adicionarPalpites',
    component: AdicionarPalpitesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultarPalpites',
    component: ConsultarPalpitesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'painelAdminstrador',
    component: AdministradorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastrarCartela',
    component: CadastrarCartelaComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'cadastrarJogos',
    component: CadastrarJogosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'perfilUsuario',
    component: PerfilUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'PerfilUsuarioAlterarSenha',
    component: PerfilUsuarioAlterarSenhaComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'PerfilUsuarioSolicitarCredito',
    component: PerfilUsuarioSolicitarCreditoComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'PerfilUsuarioAlterarDados',
    component: PerfilUsuarioAlterarDadosComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'listarPendenciaSaldoUsuario',
    component: ListarPendenciaSaldoUsuarioComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'listarUsuarios',
    component: ListarUsuariosComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'listarResultadoParcial',
    component: ListarResultadoParcialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
