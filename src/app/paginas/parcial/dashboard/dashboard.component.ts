import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { JogosService } from 'src/app/services/jogos.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  itensJogos = [];

  constructor(private toastr: ToastrService,
              public usuarioService: UsuarioService,
              public jogosService: JogosService) { }

  ngOnInit() { 
    this.atualizarListaJogos();
  }

  onSubmit(form: NgForm) {
   const dados = `
   Codigo: ${form.value.codigo}
   credito: ${form.value.addCredito} `;

 }

 atualizarListaJogos() {
  this.jogosService.listarJogos().subscribe((jogos: any[]) => {
    this.itensJogos = jogos;
  }, () => {
    this.toastr.error('Falha listar jogos.', 'Falha!');
  });
}

}
