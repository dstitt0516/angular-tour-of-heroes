import { Component, OnInit } from '@angular/core';
import { City, Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HeroService } from '../services/hero.service';
import { HeroListComponent } from "../hero-list/hero-list.component";


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, HeroListComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  
  hero: Hero | undefined;
  city = { cityid: 1 };
  heroes: Hero[] = [];
  cities: City[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
    this.heroService.getCities().subscribe(cities => this.cities = cities);
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string, cityid: number): void {
    if (typeof name !== 'string' || name.length < 1 || name.length > 10) { 
      return;
    }
    
    this.heroService.addHero({ name, cityid } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        this.getHeroes()
      });
  }

  delete(heroToDelete: Hero): void {
    this.heroService.deleteHero(heroToDelete.id)
      .subscribe({
        next: () => {
          this.heroes = this.heroes.filter(hero => hero !== heroToDelete);
          this.getHeroes()
        },
        error: err => {
          console.error('deletion failed', err);
        }
      });
  } 
}
