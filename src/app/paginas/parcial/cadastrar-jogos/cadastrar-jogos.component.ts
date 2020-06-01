import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cadastrar-jogos',
  templateUrl: './cadastrar-jogos.component.html',
  styleUrls: ['./cadastrar-jogos.component.css']
})
export class CadastrarJogosComponent implements OnInit {
  public cartela: {};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams
      .subscribe(params  => {
        this.cartela = params ;
      });
  }

}
