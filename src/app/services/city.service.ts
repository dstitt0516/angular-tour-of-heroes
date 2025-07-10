import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { City } from '../city';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private citiesURL = `${environment.apiBaseURL}/api/CityItems`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  $cities:BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);

  constructor(private http: HttpClient, private messageService: MessageService,) {}

  searchHeroCities(cityTerm: string): Observable<City[]> {
    const trimmedName = cityTerm?.trim() ?? '';

    if (trimmedName === '') {
      return of([]);
    }

    return this.http.get<City[]>(`${this.citiesURL}/?name=${cityTerm}`)
      .pipe(
        tap( city => {
          if (Array.isArray(city) && city.length > 0) {
            this.log(`found cities matching "${cityTerm}"`)
          } else {
            this.log(`no cities matching "${cityTerm}"`)
          }
        }),
        catchError(this.handleError<Hero[]>('searchHeroCities', []))
      );
  }

  getCities(): Observable<City[]> {
    const cityObservable:Observable<City[]> = this.http.get<City[]>(this.citiesURL);

    cityObservable.subscribe((cities) => this.$cities
      .next(cities))

    return cityObservable;
  }

  getCity(id: number): Observable<City> {
    const URL = `${this.citiesURL}/${id}`;

    return this.http.get<City>(URL)
      .pipe(
        tap(_ => this.log(`fetched city id=${id}`)),
        catchError(this.handleError<City>(`getCity id=${id}`))
      );
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(this.citiesURL, city, this.httpOptions)
      .pipe(
        tap((newCity: City) => this.log(`added city with id=${newCity.id}`)),
        catchError(this.handleError<City>('addCity'))
      );
  }

  /** Handle Http operation that failed. */

  private handleError<hero>(operation = 'operation', result?: hero) {
    return (error: any): Observable<hero> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as hero);
    };
  }

  /** Log a HeroService message with the MessageService */

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
