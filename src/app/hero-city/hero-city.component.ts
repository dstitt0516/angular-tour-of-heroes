import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { City } from '../city';
import {  ActivatedRoute } from '@angular/router';  
import { HeroService } from '../services/hero.service';
import { HeroListComponent } from '../hero-list/hero-list.component';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-hero-city',
  standalone: true,
  imports: [ UpperCasePipe, HeroListComponent],
  templateUrl: './hero-city.component.html',
  styleUrl: './hero-city.component.css'
})
export class HeroCityComponent implements OnInit {

  Heroes: Hero[] = [];
  matchingHeroes: Hero[] = [];
  cities: City[] = [];
  cityId = this.getCityID()

  constructor(private route: ActivatedRoute, private heroService: HeroService, private cityService: CityService) {}

  ngOnInit(): void {
    this.getHeroesByCityId();
    this.getCities();
  }

  getHeroesByCityId(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.Heroes = heroes;
        this.matchingHeroes = this.Heroes.filter(
          hero => Number(hero.cityid) === this.cityId
        );
      });
  }

  getCities(): void {
    this.cityService.getCities()
      .subscribe(cities => this.cities = cities);
  }

  getCityName() {
    const city = this.cities.find(city => Number(city.id) === this.cityId);
    
    return city;
  }

  getCityID() {
    const cityId: number = Number.parseInt(this.route.snapshot.paramMap.get('id') ?? '-1');

    if (cityId === -1 || Number.isNaN(cityId)) {
    return;
    } else {
    return cityId;
    }
  }
}