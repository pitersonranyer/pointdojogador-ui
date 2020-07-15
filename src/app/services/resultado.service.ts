import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcial } from '../interfaces/parcial';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private http: HttpClient) { }

  listarResultadoParcial(): Observable<Parcial[]> {
    const url = `${environment.pointdojogadorApiUrl}/palpiteUsuario/classificacao/todos`;
    return this.http.get<Parcial[]>(url);
  }

}
