import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PalpiteUsuarioService } from 'src/app/services/palpite-usuario.service';
import { JogosService } from 'src/app/services/jogos.service';
import { PalpiteUsuarioJogos } from '../../interfaces/palpiteUsuarioJogos';
import { Jogos } from '../../interfaces/jogos';


@Component({
  selector: 'app-consulta-palpites-modal',
  templateUrl: './consulta-palpites-modal.component.html',
  styleUrls: ['./consulta-palpites-modal.component.css']
})

export class ConsultaPalpitesModalComponent implements OnInit {
  public palpite: {};
  public idCartela: number;
  public idUsuario: number;
  public numeroPalpite: number;
  public palpiteUsuarioJogosArray: Array<PalpiteUsuarioJogos> = [];
  public jogosFim: Jogos = <Jogos>{};
  public listaPalpiteUsuario = [];
  name = 'Angular';
  message = '';
  constructor(private bsModalRef: BsModalRef,
    public palpiteUsuarioService: PalpiteUsuarioService,
    public jogosService: JogosService,
    public modalService: BsModalService) { }

  ngOnInit() {
    this.palpite = this.modalService.config.initialState;
    this.listarPalpitesUsuario(this.palpite);

    //  this.idCartela = this.modalService.config.initialState.idCartela;
    //  this.numeroPalpite = this.modalService.config.initialState.numeroPalpite;
    //  this.idUsuario = this.modalService.config.initialState.idUsuario;

  }

  listarPalpitesUsuario(palpite) {
    this.palpiteUsuarioService.listarPalpiteUsuarioChave(palpite.idUsuario, palpite.idCartela, palpite.numeroPalpite)
    .subscribe((result: any[]) => {
      this.palpiteUsuarioJogosArray = result;
      for (let i = 0; i < result.length; i++) {
        const idj = result[i].idJogos;
        this.jogosService.consutaJogosPorId(this.idCartela, idj).subscribe(data => {
          this.jogosFim = data;
          this.palpiteUsuarioJogosArray[i].idTimeMandante = this.jogosFim[0].idTimeMandante;
          this.palpiteUsuarioJogosArray[i].nomeMandante = this.jogosFim[0].nomeMandante;
          this.palpiteUsuarioJogosArray[i].nomeAbvdMandante = this.jogosFim[0].nomeAbvdMandante;
          this.palpiteUsuarioJogosArray[i].UrlEscudoMandante = this.jogosFim[0].UrlEscudoMandante;
          this.palpiteUsuarioJogosArray[i].placarTimeMandante = this.jogosFim[0].placarTimeMandante;

          this.palpiteUsuarioJogosArray[i].idTimeVisitante = this.jogosFim[0].idTimeVisitante;
          this.palpiteUsuarioJogosArray[i].nomeVisitante = this.jogosFim[0].nomeVisitante;
          this.palpiteUsuarioJogosArray[i].nomeAbvdVisitante = this.jogosFim[0].nomeAbvdVisitante;
          this.palpiteUsuarioJogosArray[i].UrlEscudoVisitante = this.jogosFim[0].UrlEscudoVisitante;
          this.palpiteUsuarioJogosArray[i].placarTimeVisitante = this.jogosFim[0].placarTimeVisitante;

        });
      }
      this.listaPalpiteUsuario = this.palpiteUsuarioJogosArray;
    });
  }



  confirm(): void {
    this.message = 'Confirmed!';
    this.bsModalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.bsModalRef.hide();
  }


}