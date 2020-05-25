import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TimesService {

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      return data.times;
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get('./assets/json/times.json');
  }
}
