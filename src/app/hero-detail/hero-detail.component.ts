import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { City } from '../city';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';
import { CityService } from '../services/city.service';
import { GenericCityListComponent } from "../generic-city-list/generic-city-list.component";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe, GenericCityListComponent],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  
  hero: Hero | undefined;
  cities: City[] = [];
  city: City | undefined;

  constructor(
    private cityService: CityService,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.getCities();
  }

  getHero(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id)
      .subscribe((hero)=> {
        this.hero = hero 
        this.cityService.getCity(hero.cityId).subscribe(city => this.city = city);

      });
  }

  getCities() {
    this.cityService.getCities().subscribe(cities => this.cities = cities);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (
      typeof this.hero === 'object' && 
      typeof this.hero.id === 'number' && 
      typeof this.hero.name === 'string' &&
      typeof this.hero.cityId === 'number' && 
      typeof this.hero.city === 'string' && 
      this.hero !== null &&
      this.hero.name.length <= 10 &&
      this.hero.name.length > 0
    ) {
      this.hero.name = this.hero.name.charAt(0).toUpperCase() + this.hero.name.slice(1);
      const matchedCity = this.cities.find(city => Number(city.id) === Number(this.hero?.cityId));
      this.hero.city = matchedCity?.name ?? '';
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
      }
  }
}
