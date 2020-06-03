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
  public timeJogo: Time = <Time>{};

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

    this.timesService.getListaTimes().subscribe(data => {
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
    this.getConsultaTimes(this.jogos.idTimeMandante);

  }


 // this.http.get(`assets/${id}/profiles/admin.json`)
 //       .subscribe(result=> {
 //           this.profile = result.json();
 //           //do some stuff 
 //       })

   getConsultaTimes(id: any) {
    this.timesService.getConsultaTimes(id)
      .subscribe(jogos => {

        console.log(jogos);

      }, () => { this.toastr.error('Falha recuperar timeMandante.'); });
  }



  //this.jogos.nomeMandante     = data.nomeTime;
  //this.jogos.nomeAbvdMandante = nomeTime;
  //this.jogos.nomeAbvdMandante = nomeTime;






  //   this.jogosService.cadastrar(this.jogos).subscribe(
  //     () => {
  //       this.toastr.success('Cadastro realizado com sucesso', 'Show!');
  //       this.atualizarListaJogos();
  //     },
  //     (erro) => {
  //       if (erro.status && erro.status === 409) {
  //         this.toastr.error('jogo ja cadastrado.', 'Falha!');
  //       } else {
  //         this.toastr.error('Não foi possível realizar cadastro do jogo.', 'Falha!');
  //       }
  //     });

}



