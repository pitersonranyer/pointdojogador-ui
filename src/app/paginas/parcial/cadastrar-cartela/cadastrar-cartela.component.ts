import { JogosService } from 'src/app/services/jogos.service';
import { Jogos } from './../../../interfaces/jogos';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimesService } from 'src/app/services/times.service';
import { CartelaService } from 'src/app/services/cartela.service';
import { Cartela } from '../../../interfaces/cartela';
import { ToastrService } from 'ngx-toastr';
import { Time } from '../../../interfaces/time';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-cartela',
  templateUrl: './cadastrar-cartela.component.html',
  styleUrls: ['./cadastrar-cartela.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CadastrarCartelaComponent implements OnInit {
  public cartela: Cartela = <Cartela>{};
  public times: Time[];
  public jogos: Jogos = <Jogos>{};
  itensCartela = [];
  indexItem = 0;
  expanded: boolean = false;
  carregando: boolean = false;
  pt: {
    firstDayOfWeek: number;
    dayNames: string[];
    dayNamesShort: string[];
    dayNamesMin: string[];
    monthNames: string[];
    monthNamesShort: string[];
    today: string;
    clear: string;
    dateFormat: string;
    weekHeader: string;
  };
  listaTimes: any[] = [];
  itensJogos: any[] = [];
  carregandoCartelas: boolean;

  constructor(
    private timesService: TimesService,
    private toastr: ToastrService,
    public cartelaService: CartelaService,
    private router: Router,
    public jogosService: JogosService
  ) {}

  ngOnInit() {
    this.timesService.listartimes().subscribe((data) => {
      this.times = data;
    });
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Su', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk',
    };

    this.atualizarListaCartela();
    this.atualizarListaJogos();
  }

  atualizarListaJogos() {
    this.carregando = true;
    this.jogosService.listarJogos().subscribe(
      (jogos: any[]) => {
        this.itensJogos = jogos;
        this.carregando = false;
      },
      () => {
        this.toastr.error('Falha listar jogos.', 'Falha!');
        this.carregando = false;
      }
    );
  }

  filtrarTimes($event) {
    this.listaTimes = [];
    this.times.forEach((time: Time) => {
      if (
        time.nomeAbvd.toLocaleLowerCase().includes($event.query) ||
        time.nomeTime.toLocaleLowerCase().includes($event.query)
      ) {
        this.listaTimes.push(time);
      }
    });
  }

  atualizarListaCartela() {
    this.carregandoCartelas = true;
    this.cartelaService.listarCartelas().subscribe(
      (cartela: any[]) => {
        this.itensCartela = cartela;
        this.carregandoCartelas = false;
      },
      () => {
        this.toastr.error('Falha listar cartelas.', 'Falha!');
        this.carregandoCartelas = false;
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(this.cartela);
    this.cartelaService.cadastrar(this.cartela).subscribe(
      () => {
        this.toastr.success('Cadastro realizado com sucesso', 'Show!');
        this.atualizarListaCartela();
      },
      (erro) => {
        if (erro.status && erro.status === 409) {
          this.toastr.error('Cartela ja cadastrada.', 'Falha!');
        } else {
          this.toastr.error('Não foi possível realizar cadastro.', 'Falha!');
        }
      }
    );
  }

  cadastrarJogos(cartela: Cartela): void {
    this.router.navigate(['/cadastrarJogos'], { queryParams: cartela });
  }

  cadastroJogos() {
    this.timesService.consutaTimePorId(this.jogos.idTimeMandante).subscribe((dadosTimeMandante) => {
      this.timesService.consutaTimePorId(this.jogos.idTimeVisitante).subscribe((dadosTimeVisitante) => {
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
          }
        );
      });
    });
  }
}
