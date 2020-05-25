import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './compartilhado/cabecalho/cabecalho.component';
import { BemVindoComponent } from './paginas/publico/bem-vindo/bem-vindo.component';
import { LoginComponent } from './paginas/publico/login/login.component';
import { CadastroComponent } from './paginas/publico/cadastro/cadastro.component';
import { DashboardComponent } from './paginas/parcial/dashboard/dashboard.component';
import { TokenApiService } from './interceptadores/token-api.service';
import { InvalidTokenApiService } from './interceptadores/invalid-token-api.service';
import { environment } from '../environments/environment';
import { CardListaLinguagensComponent } from './compartilhado/card-lista-linguagens/card-lista-linguagens.component';
import { CardGraficoLinguagensComponent } from './compartilhado/card-grafico-linguagens/card-grafico-linguagens.component';
import { JogadorComponent } from './paginas/parcial/jogador/jogador.component';
import { AlterarJogadorComponent } from './paginas/parcial/alterar-jogador/alterar-jogador.component';
import { AdicionarPalpitesComponent } from './paginas/parcial/adicionar-palpites/adicionar-palpites.component';
import { AdministradorComponent } from './paginas/parcial/administrador/administrador.component';


@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    BemVindoComponent,
    LoginComponent,
    CadastroComponent,
    DashboardComponent,
    CardListaLinguagensComponent,
    CardGraficoLinguagensComponent,
    JogadorComponent,
    AlterarJogadorComponent,
    AdicionarPalpitesComponent,
    AdministradorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(environment.toastConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidTokenApiService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
