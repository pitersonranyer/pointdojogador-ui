import { Component, OnInit } from '@angular/core';
import { SaldoUsuarioService } from 'src/app/services/saldo-usuario.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SaldoPendenciaUsuario } from '../../../interfaces/saldoPendenciaUsuario';
import { SaldoUsuario } from '../../../interfaces/saldoUsuario';
import { Usuario } from '../../../interfaces/usuario';
import * as moment from 'moment';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-listar-pendencia-saldo-usuario',
  templateUrl: './listar-pendencia-saldo-usuario.component.html',
  styleUrls: ['./listar-pendencia-saldo-usuario.component.scss']
})
export class ListarPendenciaSaldoUsuarioComponent implements OnInit {
  usuarioLogado$: Observable<Usuario>;
  usuarioLogado: Usuario;
  lista = [];
  public saldoPendenciaUsuarioArray: Array<SaldoPendenciaUsuario> = [];
  public usuariosFim: Usuario = <Usuario>{};
  public pendencia: SaldoPendenciaUsuario = <SaldoPendenciaUsuario>{};
  public saldoUsuario: SaldoUsuario = <SaldoUsuario>{};
  timestamp = '';

  constructor(public saldoUsuarioService: SaldoUsuarioService,
    public toastr: ToastrService,
    private usuarioService: UsuarioService) {

      this.usuarioLogado$ = usuarioService.getUsuario();
      this.usuarioLogado$.subscribe(usuarioLogado => this.usuarioLogado = usuarioLogado);

    }

  ngOnInit() {
    this.timestamp = moment().format('DD.MM.YYYY HH:mm:ss');
    this.atualizarListaPendenciaLibSaldo();
  }

  atualizarListaPendenciaLibSaldo() {

    this.saldoUsuarioService.listarPendeciaLiberacaoSaldoUsuario().subscribe((pendencias: any[]) => {
      this.lista = pendencias;
      this.saldoPendenciaUsuarioArray =  pendencias;
      for (let i = 0; i < this.lista.length; i++) {

        this.usuarioService.consutaUsuarioPorId(this.lista[i].idUsuario)
          .subscribe(dadosUsuario => {
            this.usuariosFim = dadosUsuario;
            this.saldoPendenciaUsuarioArray[i].nome = this.usuariosFim.nome;
            this.saldoPendenciaUsuarioArray[i].email = this.usuariosFim.email;
            this.saldoPendenciaUsuarioArray[i].contato = this.usuariosFim.contato;
          });
      }
    }, () => {
      this.toastr.error('Falha listar saldo do usuário.', 'Falha!');
    });
  }


  liberarCredito(pendencia: SaldoPendenciaUsuario): void {
    this.saldoUsuario.idUsuario = pendencia.idUsuario;
    this.saldoUsuario.idSaldoUsuario = pendencia.idSaldoUsuario;
    // ver usuario logado
    this.saldoUsuario.idUsuarioLiberador = this.usuarioLogado.id;
    this.saldoUsuario.tsLiberacao = this.timestamp;
    this.saldoUsuario.valorSolicitado = pendencia.valorSolicitado;

    this.saldoUsuarioService.liberarSaldo(this.saldoUsuario).subscribe(
      () => {
        this.atualizarListaPendenciaLibSaldo();
        this.toastr.success('Saldo liberado com sucesso', 'Show!');
      },
      (erro) => {
        if (erro.status && erro.status === 409) {
          this.toastr.error('Erro ao liberar saldo', 'Falha!');
        } else {
          this.toastr.error('Não foi possível realizar cadastro.', 'Falha!');
        }
      });
  }

}


