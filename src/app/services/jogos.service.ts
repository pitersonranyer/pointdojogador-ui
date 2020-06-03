import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';

import { Jogos } from '../interfaces/jogos';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogosService {
  private _jogosArray: BehaviorSubject<Jogos[]>;
  private _jogos: BehaviorSubject<Jogos>;
  public readonly jogos$: Observable<Jogos>;

  constructor(private http: HttpClient) {
    this._jogos = new BehaviorSubject({} as Jogos);
    this._jogosArray = new BehaviorSubject([]);
    this.jogos$ = this._jogos.asObservable();
  }

  cadastrar(jogos: Jogos) {
    const url = `${environment.linguagensApiUrl}/jogos`;
    return this.http.post(url, jogos);
  }

  listarJogos(): Observable<Jogos[]> {
    return this.getListaJogos().pipe(
      tap((jogosArray: Jogos[]) => {
        this._jogosArray.next(jogosArray);
      })
    );
  }

  getListaJogos(): Observable<Jogos[]> {
    const url = `${environment.linguagensApiUrl}/jogos/todos`;
    return this.http.get<Jogos[]>(url);
  }

}
