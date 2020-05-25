import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { TimesService } from 'src/app/services/times.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  public usuario: Usuario = <Usuario>{};
  public times: [];
  public termoUsuario = false;


  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toastr: ToastrService,
    private timesService: TimesService
  ) { }

  ngOnInit() {
    this.timesService.getJSON().subscribe(data => {
      this.times = data;
     });
}

  onSubmit() {

    this.usuario.saldo = '0';

    if ( this.usuario.email === 'pitersonranyer@gmail.com') {
      this.usuario.admin = 'S';
    } else {
      this.usuario.admin = 'N';
    }

    this.usuarioService.cadastrar(this.usuario).subscribe(
      () => {
        this.authService.logar(this.usuario).subscribe(() => {
          this.toastr.success('Cadastro realizado com sucesso', 'Show!');
        });
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
