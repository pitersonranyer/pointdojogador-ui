import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-perfil-usuario-alterar-senha',
  templateUrl: './perfil-usuario-alterar-senha.component.html',
  styleUrls: ['./perfil-usuario-alterar-senha.component.scss']
})
export class PerfilUsuarioAlterarSenhaComponent implements OnInit {
  public usuario: Usuario = <Usuario>{};

  constructor(private usuarioService: UsuarioService) { }


  ngOnInit() {
  }

}
