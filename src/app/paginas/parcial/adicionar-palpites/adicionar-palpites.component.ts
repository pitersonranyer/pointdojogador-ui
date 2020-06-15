import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JogosService } from 'src/app/services/jogos.service';
import { PalpiteUsuarioService } from 'src/app/services/palpite-usuario.service';
import { PalpiteUsuario } from '../../../interfaces/palpiteUsuario';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-adicionar-palpites',
  templateUrl: './adicionar-palpites.component.html',
  styleUrls: ['./adicionar-palpites.component.css']
})
export class AdicionarPalpitesComponent implements OnInit {
  public palpiteUsuario: PalpiteUsuario = <PalpiteUsuario>{};
  palpiteUsuarioArray: Array<PalpiteUsuario> = [];
  itensJogos = [];
  mandante = [];
  visitante = [];
  empate = [];
  public count = 0;

  constructor(private toastr: ToastrService,
    public usuarioService: UsuarioService,
    public jogosService: JogosService,
    public palpiteUsuarioService: PalpiteUsuarioService,
  ) { }

  ngOnInit() {
    this.atualizarListaJogos();
  }

  onSubmit(form: NgForm) {
    const myArray = [];
    this.count = 0;
    for (let i = 0; i < this.itensJogos.length; i++) {
      if (!this.mandante[i] && !this.visitante[i] && !this.empate[i]) {
        this.toastr.error('Exitem jogos sem palpites.', 'Falha!');
      } else {
        if (this.mandante[i] && this.visitante[i] && this.empate[i]) {
          this.count = this.count + 1;
        }
      }
    }
    if (this.count < 3) {
      this.toastr.error('Marque 3 jogos triplos.', 'Falha!');
    }
    if (this.count === 3) {
      for (let i = 0; i < this.itensJogos.length; i++) {
        if (this.mandante[i] && this.visitante[i] && !this.empate[i] ||
          this.mandante[i] && this.empate[i] && !this.visitante[i] ||
          this.visitante[i] && this.empate[i] && !this.mandante[i]) {
          this.toastr.error('Jogos duplos não são permitidos.', 'Falha!');
        }
      }
    }
    if (this.count > 3) {
      this.toastr.error('Marque apenas 3 jogos triplos.', 'Falha!');
    }

    for (let i = 0; i < this.itensJogos.length; i++) {
      this.palpiteUsuario.idUsuario = form.value.codigo;
      this.palpiteUsuario.idCartela = this.itensJogos[i].idCartela;
      this.palpiteUsuario.idJogos = this.itensJogos[i].idJogos;
      this.palpiteUsuario.palpiteTimeMandante = this.mandante[i];
      this.palpiteUsuario.palpiteTimeVisitante = this.visitante[i];
      this.palpiteUsuario.palpiteEmpate = this.empate[i];

      this.palpiteUsuarioArray.push({ ...this.palpiteUsuario });

    }
    console.log(this.palpiteUsuarioArray);
    this.palpiteUsuarioService.cadastrar(this.palpiteUsuarioArray).subscribe(
      () => {
        // ---          this.atualizarListaJogos();
        this.toastr.success('Cadastro realizado com sucesso', 'Show!');
      },
      (erro) => {
        if (erro.status && erro.status === 409) {
          this.toastr.error('Palpite já cadastrado.', 'Falha!');
        } else {
          this.toastr.error('Não foi possível realizar o cadastro o palpite.', 'Falha!');
        }
      });

  }


  atualizarListaJogos() {
    this.jogosService.listarJogos().subscribe((jogos: any[]) => {
      this.itensJogos = jogos;
    }, () => {
      this.toastr.error('Falha listar jogos.', 'Falha!');
    });
  }

}

