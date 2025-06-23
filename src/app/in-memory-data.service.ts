import { importProvidersFrom, Injectable } from '@angular/core';
import { Hero } from './hero';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes = [
      { id: 12, city: 'Altoona', name: 'Dr. Nice' },
      { id: 13, city: 'Reading', name: 'Bombasto' },
      { id: 14, city: 'Altoona', name: 'Celeritas' },
      { id: 15, city: 'Pittsburgh', name: 'Magneta' },
      { id: 16, city: 'Reading', name: 'RubberMan' },
      { id: 17, city: 'Allentown', name: 'Dynama' },
      { id: 18, city: 'Johnstown', name: 'Dr. IQ' },
      { id: 19, city: 'Altoona', name: 'Magma' },
      { id: 20, city: 'Pittsburgh', name: 'Tornado' }
    ]; 
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    if (heroes.length > 0) {
      return Math.max(...heroes.map(hero => hero.id)) + 1;
    }
    return 11;
  }
}