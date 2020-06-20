import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alterar-jogador',
  templateUrl: './alterar-jogador.component.html',
  styleUrls: ['./alterar-jogador.component.css']
})
export class AlterarJogadorComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() { }

     onSubmit(form: NgForm) {
      const dados = `
      Codigo: ${form.value.codigo}`;

    }

}
