import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../../interfaces/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  public usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe((users: any[]) => {
      this.usuarios = users;
    }, () => {
      this.toastr.error('Falha listar jogos.', 'Falha!');
    });
  }

}
