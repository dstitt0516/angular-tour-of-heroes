import { Component, OnInit } from '@angular/core';
import { City, Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [ FormsModule, NgIf, UpperCasePipe, NgFor],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  
  hero: Hero | undefined;
  cities: City[] = [];
  city: City | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.heroService.getCities().subscribe(cities => this.cities = cities);
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id)
      .subscribe((hero)=> {
        this.hero = hero 
        this.heroService.getCity(hero.cityid).subscribe(city => this.city = city);
      });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (
      typeof this.hero === 'object' && 
      typeof this.hero.id === 'number' && 
      typeof this.hero.name === 'string' && 
      this.hero !== null &&
      this.hero.name.length <= 10 &&
      this.hero.name.length > 0
    ) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
      }
  }
}
