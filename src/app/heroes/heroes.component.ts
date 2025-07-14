import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { City } from '../city';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HeroService } from '../services/hero.service';
import { HeroListComponent } from "../hero-list/hero-list.component";
import { CityService } from '../services/city.service';
import { CitiesComponent } from "../cities/cities.component";
import { GenericCityListComponent } from "../generic-city-list/generic-city-list.component";
import { HeroApiService } from '../services/hero-api.service';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, HeroListComponent, GenericCityListComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  
  hero: Hero | undefined;
  city = { cityid: 2 };
  heroes: Hero[] = [];
  cities: City[] = [];

  constructor
    (
      private heroService: HeroService, 
      public cityService: CityService
    ) {}

  ngOnInit(): void {
    this.getHeroes();
    this.getCitiesBehaviorSubject();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  getCitiesBehaviorSubject() {
    this.cityService.$cities.subscribe(cities => this.cities = cities);
  }

  addHero(name: string, cityId: number): void {
    if (typeof name !== 'string' || name.length < 1 || name.length > 10) { 
      return;
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);
    const matchedCity = this.cities.find(city => Number(city.cityId) === Number(cityId));
    const city = matchedCity?.city ?? '';
    
    this.heroService.addHero({ name, city, cityId } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.getHeroes();
      });
  }
}
