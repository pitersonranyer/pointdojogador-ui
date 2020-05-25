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
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BemVindoComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'jogador',
    component: JogadorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alterarJogador',
    component: AlterarJogadorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adicionarPalpites',
    component: AdicionarPalpitesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'painelAdminstrador',
    component: AdministradorComponent,
    canActivate: [AuthGuard]
  },

  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
