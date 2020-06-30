import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Usuario } from '../../../interfaces/usuario';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public usuario: Usuario = <Usuario>{};
  public loading: boolean = false;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  onSubmit() {
    this.loading = true;
    this.authService.logar(this.usuario).subscribe(
      () => {
        this.toastr.success('Login realizado com sucesso.', 'Show!');
        this.loading = false;
      },
      (erro) => {
        if (erro.status && erro.status === 401) {
          this.toastr.error('E-mail e/ou senha incorretos.', 'Falha!');
        } else {
          this.toastr.error('Não foi possível realizar login.', 'Falha!');
        }
        this.loading = false;
      }
    );
  }
}
