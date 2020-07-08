import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titulo = 'Point do Jogador';

  constructor(private router: Router, public authService: AuthService, private tokenService: TokenService) {}

  ngOnInit() {
    if (this.tokenService.token) {
      this.authService.criarSessao(this.tokenService.token);
    }

    this.authService.autenticado$.subscribe((autenticado) => {
      if (autenticado) {
        this.router.navigate(['/dashboard']);
        document.body.setAttribute('class', 'logged');
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
