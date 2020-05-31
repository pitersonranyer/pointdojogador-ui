import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TimesService } from 'src/app/services/times.service';
import { CartelaService } from 'src/app/services/cartela.service';
import { Cartela } from '../../../interfaces/cartela';
import { Jogos } from '../../../interfaces/jogos';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-cartela',
  templateUrl: './cadastrar-cartela.component.html',
  styleUrls: ['./cadastrar-cartela.component.css']
})
export class CadastrarCartelaComponent implements OnInit {
  public cartela: Cartela = <Cartela>{};
  public jogos: Jogos = <Jogos>{};
  public times: [];
  itensCartela = [];

  constructor(private timesService: TimesService,
    private toastr: ToastrService,
    public cartelaService: CartelaService) { }

  ngOnInit() {

    this.timesService.getJSON().subscribe(data => {
      this.times = data;
    });

    this.atualizarListaCartela();

  }


  atualizarListaCartela() {
    this.cartelaService.listarCartelas().subscribe((cartela: any[]) => {
      this.itensCartela = cartela;
      console.log(cartela);
    }, () => {
      this.toastr.error('Falha listar cartelas.', 'Falha!');
    });
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
    )



  }
}

