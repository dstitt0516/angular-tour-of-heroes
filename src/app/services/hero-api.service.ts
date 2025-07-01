import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HeroApiService {

  constructor(private http: HttpClient) {}

  testing(): Observable<any> {
    return this.http.get(`${environment.apiBaseURL}/`);
  }

  getHeroes(): Observable<any> {
    return this.http.get(`${environment.apiBaseURL}/getHeroes`);
  }

  getCities(): Observable<any> {
    return this.http.get(`${environment.apiBaseURL}/getCities`);
  }

  addHero(): Observable<any> {
    return this.http.post(`${environment.apiBaseURL}/addHero`, '');
  }

  updateHero(): Observable<any> {
    return this.http.put(`${environment.apiBaseURL}/updateHero`, '');
  }

  deleteHero(): Observable<any> {
    return this.http.delete(`${environment.apiBaseURL}/deleteHero`);
  }

}
