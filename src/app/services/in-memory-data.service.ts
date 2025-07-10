import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { City } from '../city';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService {

  // createDb() {
  //   const cities = [
  //     { id: 2, name: 'Altoona' },
  //     { id: 3, name: 'Pittsburgh' },
  //     { id: 4, name: 'Allentown' },
  //     { id: 5, name: 'Johnstown' },
  //     { id: 6, name: 'Reading' }
  //   ];

  //   const heroes = [
  //     { id: 12, name: 'Dr. Nice', cityid: 2, city: 'Altoona' },
  //     { id: 13, name: 'Bombasto', cityid: 6, city: 'Reading' },
  //     { id: 14, name: 'Celeritas', cityid: 2, city: 'Altoona' },
  //     { id: 15, name: 'Magneta', cityid: 3, city: 'Pittsburgh', },
  //     { id: 16, name: 'RubberMan', cityid: 6, city: 'Reading' },
  //     { id: 17, name: 'Dynama', cityid: 4, city: 'Allentown' },
  //     { id: 18, name: 'Dr. IQ', cityid: 5, city: 'Johnstown' },
  //     { id: 19, name: 'Magma', cityid: 2, city: 'Altoona' },
  //     { id: 20, name: 'Tornado', cityid: 3, city: 'Pittsburgh' }
  //   ]; 
  //   return {heroes, cities};
  // }

//   genIdHero(heroes: Hero[]): number {
//     if (heroes.length > 0) {
//       return Math.max(...heroes.map(hero => hero.id)) + 1;
//     }
//     return 11;
//   }

//   genIdCity(cities: City[]): number {
//     if (cities.length > 0) {
//       return Math.max(...cities.map(city => city.id)) + 1;
//     }
//     return 1;
//   }
}