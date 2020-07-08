import { Router } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, Input, ViewEncapsulation } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CabecalhoComponent {
  @Input() titulo: string;
  items: MenuItem[];
  open: boolean = true;
  itemMenu: MenuItem[];
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    public usuarioService: UsuarioService,
    private router: Router
  ) {
    this.items = [
      {
        label: 'Sair',
        icon: 'fa fa-sign-out',
        command: () => {
          this.deslogar();
        },
      },
    ];

    this.itemMenu = [
      {
        label: 'Jogos',
        icon: 'pi pi-pw pi-file',
        command: () => this.router.navigate(['/jogador']),
      },
      {
        label: 'Configurações',
        icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Gerenciar Cartela', command: () => this.router.navigate(['/cadastrarCartela']) },
          { label: 'Autorizar Jogos' },
          { label: 'Autorizar Jogos Usuário' },
        ],
      },
      {
        label: 'Usuário',
        icon: 'pi pi-fw pi-user',
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
