import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-alterar-jogador',
  templateUrl: './alterar-jogador.component.html',
  styleUrls: ['./alterar-jogador.component.css']
})
export class AlterarJogadorComponent implements OnInit {
  public usuario: Usuario = <Usuario>{};

  constructor(private usuarioService: UsuarioService,
    private toastr: ToastrService
    ) { }

  ngOnInit() { }

     onSubmit(form: NgForm) {
      const dados = `
      Codigo: ${form.value.codigo}`;

      this.usuarioService.alterarDadosUsuario(this.usuario).subscribe(
        () => {
            this.toastr.success('Senha atualizada com sucesso', 'Show!');
        },
        (erro) => {
          if (erro.status && erro.status === 409) {
            this.toastr.error('Usuário já cadastrado. Experimente utilizar outro e-mail.', 'Falha!');
          } else {
            this.toastr.error('Não foi possível realizar cadastro.', 'Falha!');
          }
        }
      );

    }

}
