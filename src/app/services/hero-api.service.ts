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
    console.log(this.http.get(`${environment.apiBaseURL}/api/HeroItems/`))
    return this.http.get(`${environment.apiBaseURL}/api/HeroItems/`);
  }

  getCities(): Observable<any> {
    console.log(this.http.get(`${environment.apiBaseURL}/api/CityItems`))
    return this.http.get(`${environment.apiBaseURL}/api/CityItems`);
  }

  getHeroesById(id: number): Observable<any> {
    console.log(this.http.get(`${environment.apiBaseURL}/api/HeroItems/`))
    return this.http.get(`${environment.apiBaseURL}/api/HeroItems/${id}`);
  }

  getCitiesById(cityId: number): Observable<any> {
    console.log(this.http.get(`${environment.apiBaseURL}/api/CityItems`))
    return this.http.get(`${environment.apiBaseURL}/api/CityItems${cityId}`);
  }

  addHero(hero: Observable<any>): Observable<any> {
    return this.http.post(`${environment.apiBaseURL}/api/HeroItems/`, hero);
  }

  addCities(city: Observable<any>): Observable<any> {
    return this.http.post(`${environment.apiBaseURL}/api/HeroItems/`, city);
  }

  updateHero(hero: Observable<any>): Observable<any> {
    return this.http.put(`${environment.apiBaseURL}/api/HeroItems/`, hero);
  }

  deleteHero(id: number): Observable<any> {
    return this.http.delete(`${environment.apiBaseURL}/api/HeroItems/${id}`);
  }

}
