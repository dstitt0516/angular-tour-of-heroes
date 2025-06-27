import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const cities = [
      { id: 1, name: 'Altoona' },
      { id: 2, name: 'Pittsburgh' },
      { id: 3, name: 'Allentown' },
      { id: 4, name: 'Johnstown' },
      { id: 5, name: 'Reading' }
    ];

    const heroes = [
      { id: 12, name: 'Dr. Nice', cityid: 1, city: 'Altoona' },
      { id: 13, name: 'Bombasto', cityid: 5, city: 'Reading' },
      { id: 14, name: 'Celeritas', cityid: 1, city: 'Altoona' },
      { id: 15, name: 'Magneta', cityid: 2, city: 'Pittsburgh', },
      { id: 16, name: 'RubberMan', cityid: 5, city: 'Reading' },
      { id: 17, name: 'Dynama', cityid: 3, city: 'Allentown' },
      { id: 18, name: 'Dr. IQ', cityid: 4, city: 'Johnstown' },
      { id: 19, name: 'Magma', cityid: 1, city: 'Altoona' },
      { id: 20, name: 'Tornado', cityid: 2, city: 'Pittsburgh' }
    ]; 
    return {heroes, cities};
  }

  genId(heroes: Hero[]): number {
    if (heroes.length > 0) {
      return Math.max(...heroes.map(hero => hero.id)) + 1;
    }
    return 11;
  }
}