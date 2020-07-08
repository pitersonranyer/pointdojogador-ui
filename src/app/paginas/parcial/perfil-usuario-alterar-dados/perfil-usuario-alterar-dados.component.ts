import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-perfil-usuario-alterar-dados',
  templateUrl: './perfil-usuario-alterar-dados.component.html',
  styleUrls: ['./perfil-usuario-alterar-dados.component.scss']
})
export class PerfilUsuarioAlterarDadosComponent implements OnInit {

  public usuario: Usuario = <Usuario>{};
  public usuarioAtu: Usuario = <Usuario>{};

  comment = null;
  @ViewChild('f')
  form: NgForm;

  constructor(private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.usuarioService.consutaUsuarioPorId(this.form.controls.codigo.value)
        .subscribe(dadosUsuario => {
          this.usuario = dadosUsuario;
        });
    });
  }

  onSubmit(form: NgForm) {

    this.usuarioAtu._id = form.value.codigo;
    this.usuarioAtu.nome = form.value.nome;
    this.usuarioAtu.email = form.value.email;
    this.usuarioAtu.contato = form.value.contato;
    this.usuarioAtu.timeFavorito = form.value.timeFavorito;
    this.usuarioAtu.saldo = this.usuario.saldo;
    this.usuarioAtu.admin = this.usuario.admin;


       this.usuarioService.alterarDadosUsuario(this.usuarioAtu).subscribe(
         () => {
             this.toastr.success('Dados atualizados com sucesso', 'Show!');
         },
         (erro) => {
           if (erro.status && erro.status === 409) {
             this.toastr.error('Usuário já cadastrado. Experimente utilizar outro e-mail.', 'Falha!');
           } else {
             this.toastr.error('Não foi possível realizar cadastro.', 'Falha!');
           }
         }
       );

  }

}
