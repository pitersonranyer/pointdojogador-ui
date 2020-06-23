import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JogosService } from 'src/app/services/jogos.service';
import { PalpiteUsuarioService } from 'src/app/services/palpite-usuario.service';
import { PalpiteUsuario } from '../../../interfaces/palpiteUsuario';
import { Palpite } from '../../../interfaces/palpite';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalConfirmaComponent } from '../../../modal/modal-confirma/modal-confirma.component';
import { ConsultaPalpitesModalComponent } from '../../../modal/consulta-palpites-modal/consulta-palpites-modal.component';

@Component({
  selector: 'app-adicionar-palpites',
  templateUrl: './adicionar-palpites.component.html',
  styleUrls: ['./adicionar-palpites.component.css']
})
export class AdicionarPalpitesComponent implements OnInit {
  public palpiteUsuario: PalpiteUsuario = <PalpiteUsuario>{};
  palpiteUsuarioArray: Array<PalpiteUsuario> = [];
  itensJogos = [];
  listaPalpite = [];
  mandante = [];
  visitante = [];
  empate = [];
  count = 0;
  idC = 0;
  idU = 0;
  valida = true;
  confirmResult = null;
  modalRef: BsModalRef;

  comment = null;
  @ViewChild('f')
  form: NgForm;

  constructor(private toastr: ToastrService,
    public usuarioService: UsuarioService,
    public jogosService: JogosService,
    public palpiteUsuarioService: PalpiteUsuarioService,
    private simpleModalService: SimpleModalService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {


    this.atualizarListaJogos();

  }

  onSubmit() {

  }

  atualizarListaJogos() {
    this.jogosService.listarJogos().subscribe((jogos: any[]) => {
      this.itensJogos = jogos;
      this.atualizarListaPalpite();
    }, () => {
      this.toastr.error('Falha listar jogos.', 'Falha!');
    });
  }

  atualizarListaPalpite() {
    // recuperar dados da tela.
    setTimeout(() => {
      this.idU = this.form.controls.codigo.value;
      this.idC = this.itensJogos[0].idCartela;
      this.palpiteUsuarioService.listarPalpitePorIdCartelaIdUsuario(this.idC, this.idU).subscribe((palpite: any[]) => {
        this.listaPalpite = palpite;
      }, () => { });
    });
  }

  cadastrarPalpites(form: NgForm): void {
    this.valida = true;
    this.count = 0;
    for (let i = 0; i < this.itensJogos.length; i++) {
      if (!this.mandante[i] && !this.visitante[i] && !this.empate[i]) {
        this.valida = false;
        this.toastr.error('Exitem jogos sem palpites.', 'Falha!');
      } else {
        if (this.mandante[i] && this.visitante[i] && this.empate[i]) {
          this.count = this.count + 1;
        }
      }
    }
    if (this.count < 3) {
      this.valida = false;
      this.toastr.error('Marque 3 jogos triplos.', 'Falha!');
    }
    if (this.count === 3) {
      for (let i = 0; i < this.itensJogos.length; i++) {
        if (this.mandante[i] && this.visitante[i] && !this.empate[i] ||
          this.mandante[i] && this.empate[i] && !this.visitante[i] ||
          this.visitante[i] && this.empate[i] && !this.mandante[i]) {
          this.valida = false;
          this.toastr.error('Jogos duplos não são permitidos.', 'Falha!');
        }
      }
    }
    if (this.count > 3) {
      this.valida = false;
      this.toastr.error('Marque apenas 3 jogos triplos.', 'Falha!');
    }

    if (this.valida) {
      for (let i = 0; i < this.itensJogos.length; i++) {
        this.palpiteUsuario.idUsuario = this.idU;
        this.palpiteUsuario.idCartela = this.itensJogos[i].idCartela;
        this.palpiteUsuario.idJogos = this.itensJogos[i].idJogos;
        this.palpiteUsuario.palpiteTimeMandante = this.mandante[i];
        this.palpiteUsuario.palpiteTimeVisitante = this.visitante[i];
        this.palpiteUsuario.palpiteEmpate = this.empate[i];

        this.palpiteUsuarioArray.push({ ...this.palpiteUsuario });

      }
      this.palpiteUsuarioService.cadastrar(this.palpiteUsuarioArray).subscribe(
        () => {
          this.atualizarListaPalpite();
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
  }

 // consultarPalpites(palpite: Palpite): void {
 //   this.router.navigate(['/consultarPalpites'], { queryParams: palpite });
 // }

  excluirPalpite(palpite: Palpite): void {
    this.simpleModalService.addModal(ModalConfirmaComponent, {
      title: 'Confirmação',
      message: 'Seu palpite será excluido.'
    })
      .subscribe((isConfirmed) => {
        // Get modal result
        this.confirmResult = isConfirmed;
        if (this.confirmResult) {
          this.palpiteUsuarioService.deletaPalpite(palpite.idCartela, palpite.idUsuario, palpite.numeroPalpite).subscribe(
            () => {
              this.atualizarListaPalpite();
              this.toastr.success('Exclusão realizada com sucesso', 'Show!');
            },
            (erro) => {
              if (erro.status && erro.status === 404) {
                this.toastr.error('Exclusão não efetuada, registro inexistente.', 'Falha!');
              } else {
                this.toastr.error('Não foi possível realizar a exclusão o palpite.', 'Falha!');
              }
            });
        }

      });
  }
  consultarPalpites(palpite: Palpite): void {
    this.modalRef = this.modalService.show(ConsultaPalpitesModalComponent, {
      initialState: palpite
    });
  }
}

