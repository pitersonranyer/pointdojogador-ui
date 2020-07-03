import { UsuarioService } from './../../services/usuario.service';
import { Component, Input } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
})
export class CabecalhoComponent {
  @Input() titulo: string;
  items: MenuItem[];
  open: boolean = true;
  constructor(private authService: AuthService, private toastr: ToastrService, public usuarioService: UsuarioService) {
    this.items = [
      {
        label: 'Sair',
        icon: 'fa fa-sign-out',
        command: () => {
          this.deslogar();
        },
      },
    ];
  }

  toglleNav() {
    if (this.open) {
      document.getElementsByClassName('logged')[0]['style'].width = '100%';
      document.getElementsByClassName('logged')[0]['style'].marginLeft = '0';
      document.getElementsByClassName('navbar')[0]['style'].width = '100%';
      document.querySelector('nav.menu')['style'].display = 'none';
    } else {
      document.body.removeAttribute('class');
      document.body.removeAttribute('style');
      document.body.setAttribute('class', 'logged');
      document.getElementsByClassName('navbar')[0]['style'].width = '82%';
      document.querySelector('nav.menu')['style'].display = 'block';
    }
    this.open = !this.open;
  }

  deslogar() {
    this.authService.deslogar().subscribe(() => {
      this.toastr.success('Já vai? Sentiremos sua falta :(', 'Show!');
    });
  }
}
