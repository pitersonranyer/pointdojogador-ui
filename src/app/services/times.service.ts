import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Time } from '../interfaces/time';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TimesService {
  // Base url
  //baseurl = './assets/data/times.json';
  baseurl = 'assets/data/times.json';
  apiURL = 'http://localhost:4200/assets/json/times.json';

  constructor(private http: HttpClient) {


    this.getListaTimes().subscribe(data => {
      return data.times;
    });

  }

  // Obtem todos os times
  getListaTimes(): Observable<any> {
    return this.http.get(this.baseurl);
  }

  getConsultaTimes(_id: any): Observable<any> {

    return this.http.get(`assets/data/times.json/${_id}`);
    // return this.http.get<Time>(this.baseurl + '/' + _id);
  }

}
