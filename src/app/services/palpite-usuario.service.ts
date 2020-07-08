import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';

import { PalpiteUsuario } from '../interfaces/palpiteUsuario';
import { Palpite } from '../interfaces/palpite';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PalpiteUsuarioService {
  private _palpiteUsuarioArray: BehaviorSubject<PalpiteUsuario[]>;
  private _palpiteUsuario: BehaviorSubject<PalpiteUsuario>;
  public readonly jogos$: Observable<PalpiteUsuario>;

  constructor(private http: HttpClient) {
    this._palpiteUsuario = new BehaviorSubject({} as PalpiteUsuario);
    this._palpiteUsuarioArray = new BehaviorSubject([]);
    this.jogos$ = this._palpiteUsuario.asObservable();
  }

  cadastrar(palpiteUsuario: PalpiteUsuario[]) {
    const url = `${environment.pointdojogadorApiUrl}/palpiteUsuario`;
    return this.http.post(url, palpiteUsuario);
  }

  listarPalpiteUsuario(): Observable<PalpiteUsuario[]> {
    return this.getListaPalpiteUsuario().pipe(
      tap((palpiteUsuarioArray: PalpiteUsuario[]) => {
        this._palpiteUsuarioArray.next(palpiteUsuarioArray);
      })
    );
  }

  getListaPalpiteUsuario(): Observable<PalpiteUsuario[]> {
    const url = `${environment.pointdojogadorApiUrl}/palpiteUsuario/todos`;
    return this.http.get<PalpiteUsuario[]>(url);
  }

  listarPalpitePorIdCartelaIdUsuario(idCartela: number, idUsuario: number): Observable<Palpite[]> {
    const url = `${environment.pointdojogadorApiUrl}/palpite/${idCartela}/${idUsuario}`;
    return this.http.get<Palpite[]>(url);
  }

  listarPalpiteUsuarioChave(idCartela: number, idUsuario: number, numeroPalpite: number): Observable<PalpiteUsuario[]> {
    const url = `${environment.pointdojogadorApiUrl}/palpiteUsuario/${idCartela}/${idUsuario}/${numeroPalpite}`;
    return this.http.get<PalpiteUsuario[]>(url);
  }
  deletaPalpite(idCartela: number, idUsuario: number, numeroPalpite: number): Observable<PalpiteUsuario> {
    const url = `${environment.pointdojogadorApiUrl}/palpiteUsuario/${idCartela}/${idUsuario}/${numeroPalpite}`;
    return this.http.delete<PalpiteUsuario>(url);
  }
}
