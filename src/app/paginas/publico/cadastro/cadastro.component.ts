import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { TimesService } from 'src/app/services/times.service';
import { Time } from '../../../interfaces/time';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  public usuario: Usuario = <Usuario>{};
  public times: Time[];
  public termoUsuario = false;
  public listaTimes: Time[];
  public timeFavorito: Time = <Time>{};

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private toastr: ToastrService,
    private timesService: TimesService
  ) { }

  ngOnInit() {
    this.timesService.listartimes().subscribe((data) => {
      this.times = data;
    });
  }

  filtrarTimes($event) {
    this.listaTimes = [];
    this.times.forEach((time: Time) => {
      if (
        time.nomeAbvd.toLocaleLowerCase().includes($event.query) ||
        time.nomeTime.toLocaleLowerCase().includes($event.query)
      ) {
        this.listaTimes.push(time);
      }
    });
  }

  onSubmit() {
    this.usuario.saldo = 0;

    if (this.usuario.email === 'pitersonranyer@gmail.com') {
      this.usuario.admin = true;
    } else {
      this.usuario.admin = false;
    }
    this.usuario.timeFavorito = this.timeFavorito.nomeTime;
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
