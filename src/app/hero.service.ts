import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City, Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class HeroService {

  private heroesUrl = 'api/heroes';
  private citiesUrl = 'api/cities';
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  
  /** Data Retrieval Methods */

  getCities(): Observable<City[]> {
    return this.http.get<City[]>('api/cities');
  }

  getCity(id: number): Observable<City> {
    const url = `api/cities/${id}`

    return this.http.get<City>(url)
      .pipe(
        tap(_ => this.log(`fetched city id=${id}`)),
        catchError(this.handleError<City>(`getCity id=${id}`))
      );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
    }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
      .pipe( 
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */

  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    let outcome: string;

    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]),
        tap(hero => {
          if (typeof hero === 'object' && hero !== null) {
              outcome = 'fetched';
          } else {
              outcome = 'did not find'; 
          }
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  searchHeroes(heroTerm: string): Observable<Hero[]> {
    const trimmedName = heroTerm?.trim() ?? '';

    if (trimmedName === '') {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${heroTerm}`)
      .pipe(
        tap( hero => {
          if (Array.isArray(hero) && hero.length > 0) {
            this.log(`found heroes matching "${heroTerm}"`)
          } else {
            this.log(`no heroes matching "${heroTerm}"`)
          }
        }),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  searchHeroCities(cityTerm: string): Observable<City[]> {
    const trimmedName = cityTerm?.trim() ?? '';

    if (trimmedName === '') {
      return of([]);
    }

    return this.http.get<City[]>(`${this.citiesUrl}/?name=${cityTerm}`)
      .pipe(
        tap( city => {
          if (Array.isArray(city) && city.length > 0) {
            this.log(`found heroes in cities matching "${cityTerm}"`)
          } else {
            this.log(`no heroes in cities matching "${cityTerm}"`)
          }
        }),
        catchError(this.handleError<Hero[]>('searchHeroCities', []))
      );
  }

  /** Data Modification Methods */

  updateHero(hero: Hero): Observable<Object> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<Object>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added hero with id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addCity'))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
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
