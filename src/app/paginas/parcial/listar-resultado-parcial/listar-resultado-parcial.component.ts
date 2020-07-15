import { Component, OnInit } from '@angular/core';
import { ResultadoService } from 'src/app/services/resultado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-resultado-parcial',
  templateUrl: './listar-resultado-parcial.component.html',
  styleUrls: ['./listar-resultado-parcial.component.css']
})
export class ListarResultadoParcialComponent implements OnInit {
  listaResultados: any[] = [];

  constructor(public resultadoService: ResultadoService,
    private toastr: ToastrService) {

    this.atualizarListaResutaldoParcial();

  }

  ngOnInit() {
  }

  atualizarListaResutaldoParcial() {
    this.resultadoService.listarResultadoParcial().subscribe(
      (resultado: any[]) => {
        this.listaResultados = resultado;
      },
      () => {
        this.toastr.error('Falha ao listar resutaldos parcias.', 'Falha!');
      }
    );
  }

}
