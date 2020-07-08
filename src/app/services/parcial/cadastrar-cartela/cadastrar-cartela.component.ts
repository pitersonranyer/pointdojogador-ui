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
  styleUrls: ['./cadastrar-cartela.component.css']
})
export class CadastrarCartelaComponent implements OnInit {
  public cartela: Cartela = <Cartela>{};
  public times: Time[];
  itensCartela = [];

  constructor(private timesService: TimesService,
    private toastr: ToastrService,
    public cartelaService: CartelaService,
    private router: Router) { }

  ngOnInit() {

    this.timesService.listartimes().subscribe(data => {
      this.times = data;
    });

    this.atualizarListaCartela();

  }

  atualizarListaCartela() {
    this.cartelaService.listarCartelas().subscribe((cartela: any[]) => {
      this.itensCartela = cartela;
      }, () => {
      this.toastr.error('Falha listar cartelas.', 'Falha!');
    });
  }


  onSubmit(form: NgForm) {
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
      });

  }

  cadastrarJogos(cartela: Cartela): void {
    this.router.navigate(['/cadastrarJogos'], {queryParams: cartela});
  }

}

