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
  public teste: boolean = true;
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
      {
        label: 'Perfil',
        icon: 'fa fa-user',
        command: () => {
          this.router.navigate(['/perfilUsuario']);
        },
      },
    ];

    this.itemMenu = [
      {
        label: 'Dashboard',
        icon: 'pi pi-desktop',
        command: () => this.router.navigate(['/dashboard']),
      },
      {
        visible: this.teste,
        label: 'Gerenciar',
        icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Adicionar Cartela', command: () => this.router.navigate(['/cadastrarCartela']) },
          { label: 'Autorizar Crédito', command: () => this.router.navigate(['/listarPendenciaSaldoUsuario']) },
          { label: 'Listar Usuários', command: () => this.router.navigate(['/#']) },
        ],
      },
      {
        label: 'Adicionar Palpite',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.router.navigate(['/adicionarPalpites']),
      },
      {
        label: 'Solicitar Crédito',
        icon: 'pi pi-id-card',
        command: () => this.router.navigate(['/PerfilUsuarioSolicitarCredito']),
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
