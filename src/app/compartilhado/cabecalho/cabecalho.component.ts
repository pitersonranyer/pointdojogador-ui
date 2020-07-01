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
  constructor(private authService: AuthService, private toastr: ToastrService) {
    this.items = [
      {
        items: [
          {
            label: 'Sair',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
              this.deslogar();
            },
          },
        ],
      },
    ];
  }

  deslogar() {
    this.authService.deslogar().subscribe(() => {
      this.toastr.success('Já vai? Sentiremos sua falta :(', 'Show!');
    });
  }
}
