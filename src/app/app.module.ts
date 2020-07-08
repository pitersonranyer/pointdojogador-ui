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
import { CadastrarCartelaComponent } from './paginas/parcial/cadastrar-cartela/cadastrar-cartela.component';
import { CadastrarJogosComponent } from './paginas/parcial/cadastrar-jogos/cadastrar-jogos.component';
import { ConsultarPalpitesComponent } from './paginas/parcial/consultar-palpites/consultar-palpites.component';
import { ModalConfirmaComponent } from './modal/modal-confirma/modal-confirma.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConsultaPalpitesModalComponent } from './modal/consulta-palpites-modal/consulta-palpites-modal.component';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';

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
    AdministradorComponent,
    CadastrarCartelaComponent,
    CadastrarJogosComponent,
    ConsultarPalpitesComponent,
    ModalConfirmaComponent,
    ConsultaPalpitesModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    AutoCompleteModule,
    MenuModule,
    TooltipModule,
    CalendarModule,
    InputTextareaModule,
    AccordionModule,
    ScrollPanelModule,
    ButtonModule,
    PanelMenuModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(environment.toastConfig),
    SimpleModalModule.forRoot({ container: 'modal-container' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenApiService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidTokenApiService,
      multi: true,
    },
  ],
  entryComponents: [ModalConfirmaComponent, ConsultaPalpitesModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
