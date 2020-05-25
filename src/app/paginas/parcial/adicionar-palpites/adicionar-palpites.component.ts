import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-adicionar-palpites',
  templateUrl: './adicionar-palpites.component.html',
  styleUrls: ['./adicionar-palpites.component.css']
})
export class AdicionarPalpitesComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
