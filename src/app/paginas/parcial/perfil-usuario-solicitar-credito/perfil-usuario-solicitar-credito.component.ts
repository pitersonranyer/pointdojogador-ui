import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { SaldoUsuario } from '../../../interfaces/saldoUsuario';
import { ToastrService } from 'ngx-toastr';

import { SaldoUsuarioService } from 'src/app/services/saldo-usuario.service';

import * as moment from 'moment';

@Component({
  selector: 'app-perfil-usuario-solicitar-credito',
  templateUrl: './perfil-usuario-solicitar-credito.component.html',
  styleUrls: ['./perfil-usuario-solicitar-credito.component.scss']
})
export class PerfilUsuarioSolicitarCreditoComponent implements OnInit {
  public saldoUsuario: SaldoUsuario = <SaldoUsuario>{};
  public usuario: Usuario = <Usuario>{};
  idU = 0;
  itensSaldos = [];

  @ViewChild('f')
  form: NgForm;

  timestamp = '';

  constructor(private usuarioService: UsuarioService,
    public saldoUsuarioService: SaldoUsuarioService,
    public toastr: ToastrService) { }

  ngOnInit() {

    this.timestamp = moment().format('DD.MM.YYYY HH:mm:ss');
    this.atualizarListaSaldoUsuario();
  }

  atualizarListaSaldoUsuario() {

    setTimeout(() => {
      this.idU = this.form.controls.codigo.value;
      this.saldoUsuarioService.listarSaldoUsuario(this.idU).subscribe((saldos: any[]) => {
        this.itensSaldos = saldos;
      }, () => {
        this.toastr.error('Falha listar saldo do usuário.', 'Falha!');
      });
    });
  }

  solicitarCredito(form: NgForm): void {
    this.saldoUsuario.idUsuario = this.form.controls.codigo.value;
    this.saldoUsuario.idUsuarioLiberador = null;
    this.saldoUsuario.tsLiberacao = null;
    this.saldoUsuario.tsSolicitacao = this.timestamp;
    this.saldoUsuario.indicadorLiberacao = false;
    this.save();
  }

  save() {
    this.saldoUsuarioService.cadastrar(this.saldoUsuario).subscribe(
      () => {
        this.atualizarListaSaldoUsuario();
        this.toastr.success('Cadastro realizado com sucesso', 'Show!');
      },
      (erro) => {
        if (erro.status && erro.status === 409) {
          this.toastr.error('Saldo ja cadastrado.', 'Falha!');
        } else {
          this.toastr.error('Não foi possível realizar cadastro.', 'Falha!');
        }
      });
  }

  onSubmit() {
    this.save();
  }

}
