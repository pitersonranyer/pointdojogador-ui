import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
   const dados = `
   Codigo: ${form.value.codigo}
   credito: ${form.value.addCredito} `;

   // console.log(dados);
 }

}
