import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PalpiteUsuarioService } from 'src/app/services/palpite-usuario.service';
import { JogosService } from 'src/app/services/jogos.service';
import { PalpiteUsuarioJogos } from '../../../interfaces/palpiteUsuarioJogos';
import { Jogos } from '../../../interfaces/jogos';

@Component({
  selector: 'app-consultar-palpites',
  templateUrl: './consultar-palpites.component.html',
  styleUrls: ['./consultar-palpites.component.css']
})
export class ConsultarPalpitesComponent implements OnInit {
  public jogosFim: Jogos = <Jogos>{};
  public idCartela: number;
  public idUsuario: number;
  public numeroPalpite: number;
  public listaPalpiteUsuario = [];
  public palpiteUsuarioJogosArray: Array<PalpiteUsuarioJogos> = [];
  palpiteUsuario: {};

  constructor(
    public palpiteUsuarioService: PalpiteUsuarioService,
    public jogosService: JogosService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idCartela = params.idCartela;
      this.numeroPalpite = params.numeroPalpite;
      this.idUsuario = params.idUsuario;
      this.palpiteUsuario = params;
    });
    this.palpiteUsuarioService.listarPalpiteUsuarioChave(this.idUsuario, this.idCartela, this.numeroPalpite).subscribe((result: any[]) => {
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
}

