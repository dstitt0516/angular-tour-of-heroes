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

  constructor(private route: ActivatedRoute, private heroService: HeroService, private cityService: CityService) {}

  ngOnInit(): void {
    this.getHeroes();
    this.cityService.getCities()
      .subscribe(cities => this.cities = cities);
  }

  getCityID() {
    const cityid: number = Number(this.route.snapshot.paramMap.get('id'));

    if (typeof cityid !== 'number' || Number.isNaN(cityid) || cityid === null) {
      return;
    } else {
      return cityid;
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {
        this.Heroes = heroes;
        this.matchingHeroes = this.Heroes.filter(
          hero => Number(hero.cityid) === this.getCityID()
        );
      });
  }

  getCityName() {
    const city = this.cities.find(city => Number(city.id) === this.getCityID());
    
    return city;
  }
}