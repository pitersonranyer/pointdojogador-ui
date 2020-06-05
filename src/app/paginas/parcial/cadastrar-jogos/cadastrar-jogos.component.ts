import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { JogosService } from 'src/app/services/jogos.service';
import { Jogos } from '../../../interfaces/jogos';
import { TimesService } from 'src/app/services/times.service';
import { Time } from '../../../interfaces/time';


@Component({
  selector: 'app-cadastrar-jogos',
  templateUrl: './cadastrar-jogos.component.html',
  styleUrls: ['./cadastrar-jogos.component.css']
})
export class CadastrarJogosComponent implements OnInit {
  public cartela: {};
  public idCartela: number;
  public jogos: Jogos = <Jogos>{};
  public times: Time[];
  itensJogos = [];

  constructor(private timesService: TimesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    public jogosService: JogosService) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.idCartela = params.idCartela;
      this.jogos.idCartela = this.idCartela;
      this.cartela = params;

    });

    this.timesService.listartimes().subscribe(data => {
      this.times = data;
    });

    this.atualizarListaJogos();
  }

  atualizarListaJogos() {
    this.jogosService.listarJogos().subscribe((jogos: any[]) => {
      this.itensJogos = jogos;
    }, () => {
      this.toastr.error('Falha listar jogos.', 'Falha!');
    });
  }

  onSubmit(form: NgForm) {

    this.timesService.consutaTimePorId(this.jogos.idTimeMandante)
      .subscribe(dadosTimeMandante => {
        this.timesService.consutaTimePorId(this.jogos.idTimeVisitante)
          .subscribe(dadosTimeVisitante => {

            this.jogos.nomeMandante = dadosTimeMandante.nomeTime;
            this.jogos.nomeAbvdMandante = dadosTimeMandante.nomeAbvd;
            this.jogos.UrlEscudoMandante = dadosTimeMandante.UrlEscudo;

            this.jogos.nomeVisitante = dadosTimeVisitante.nomeTime;
            this.jogos.nomeAbvdVisitante = dadosTimeVisitante.nomeAbvd;
            this.jogos.UrlEscudoVisitante = dadosTimeVisitante.UrlEscudo;

            this.jogosService.cadastrar(this.jogos).subscribe(
              () => {
                this.atualizarListaJogos();
                this.toastr.success('Cadastro realizado com sucesso', 'Show!');
              },
              (erro) => {
                if (erro.status && erro.status === 409) {
                  this.toastr.error('jogo já cadastrado.', 'Falha!');
                } else {
                  this.toastr.error('Não foi possível realizar o cadastro do jogo.', 'Falha!');
                }
              });
          });
      });
  }
}