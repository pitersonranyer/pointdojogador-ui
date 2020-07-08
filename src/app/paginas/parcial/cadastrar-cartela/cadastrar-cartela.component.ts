import { Component, OnInit } from '@angular/core';
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
})
export class CadastrarCartelaComponent implements OnInit {
  public cartela: Cartela = <Cartela>{};
  public times: Time[];
  itensCartela = [];
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

  constructor(
    private timesService: TimesService,
    private toastr: ToastrService,
    public cartelaService: CartelaService,
    private router: Router
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
  }

  atualizarListaCartela() {
    this.cartelaService.listarCartelas().subscribe(
      (cartela: any[]) => {
        this.itensCartela = cartela;
      },
      () => {
        this.toastr.error('Falha listar cartelas.', 'Falha!');
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
}
