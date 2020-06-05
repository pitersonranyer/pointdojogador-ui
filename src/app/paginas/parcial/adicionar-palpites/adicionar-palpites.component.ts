import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JogosService } from 'src/app/services/jogos.service';

@Component({
  selector: 'app-adicionar-palpites',
  templateUrl: './adicionar-palpites.component.html',
  styleUrls: ['./adicionar-palpites.component.css']
})
export class AdicionarPalpitesComponent implements OnInit {
  itensJogos = [];

  constructor(private toastr: ToastrService,
              public usuarioService: UsuarioService,
              public jogosService: JogosService) { }

  ngOnInit() {

    this.atualizarListaJogos();

  }

  atualizarListaJogos() {
    this.jogosService.listarJogos().subscribe((jogos: any[]) => {
      this.itensJogos = jogos;
    }, () => {
      this.toastr.error('Falha listar jogos.', 'Falha!');
    });
  }

}
