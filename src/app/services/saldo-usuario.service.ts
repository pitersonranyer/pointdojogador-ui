import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';

import { SaldoUsuario } from '../interfaces/saldoUsuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaldoUsuarioService {
  private _saldoUsuarios: BehaviorSubject<SaldoUsuario[]>;
  private _saldoUsuario: BehaviorSubject<SaldoUsuario>;
  public readonly saldoUsuario$: Observable<SaldoUsuario>;

  constructor(private http: HttpClient) {
    this._saldoUsuario = new BehaviorSubject({} as SaldoUsuario);
    this._saldoUsuarios = new BehaviorSubject([]);
    this.saldoUsuario$ = this._saldoUsuario.asObservable();
  }

  cadastrar(saldoUsuario: SaldoUsuario) {
    const url = `${environment.pointdojogadorApiUrl}/saldoUsuario`;
    return this.http.post(url, saldoUsuario);
  }

  listarSaldoUsuario(idUsuario: number): Observable<SaldoUsuario[]> {
    const url = `${environment.pointdojogadorApiUrl}/saldoUsuario/lista/${idUsuario}`;
    return this.http.get<SaldoUsuario[]>(url);
  }

  listarPendeciaLiberacaoSaldoUsuario(): Observable<SaldoUsuario[]> {
    const url = `${environment.pointdojogadorApiUrl}/saldoUsuario/pendencia`;
    return this.http.get<SaldoUsuario[]>(url);
  }

  liberarSaldo(saldoUsuario: SaldoUsuario) {
    const url = `${environment.pointdojogadorApiUrl}/saldoUsuario/liberarSaldo`;
    return this.http.put(url, saldoUsuario);
  }

}

