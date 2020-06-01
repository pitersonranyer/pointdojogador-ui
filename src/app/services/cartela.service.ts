import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';

import { Cartela } from '../interfaces/cartela';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartelaService {
  private _cartelas: BehaviorSubject<Cartela[]>;
  private _cartela: BehaviorSubject<Cartela>;
  public readonly cartela$: Observable<Cartela>;

  constructor(private http: HttpClient) {
    this._cartela = new BehaviorSubject({} as Cartela);
    this._cartelas = new BehaviorSubject([]);
    this.cartela$ = this._cartela.asObservable();
  }

  cadastrar(cartela: Cartela) {
    const url = `${environment.linguagensApiUrl}/cartelas`;
    return this.http.post(url, cartela);
  }

  listarCartelas(): Observable<Cartela[]> {
    return this.getListaCartelas().pipe(
      tap((cartelas: Cartela[]) => {
        this._cartelas.next(cartelas);
      })
    );
  }

  getListaCartelas(): Observable<Cartela[]> {
    const url = `${environment.linguagensApiUrl}/cartelas/todas`;
    return this.http.get<Cartela[]>(url);
  }

}
