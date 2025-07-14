import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [ NgFor, RouterLink ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent {

  @Input() heroes!:Hero[];

  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  delete(heroToDelete: Hero): void {
    this.heroService.deleteHero(heroToDelete.id)
      .subscribe({
        next: () => {
          this.heroes = this.heroes.filter(hero => hero !== heroToDelete);
        },
        error: err => {
          console.error('deletion failed', err);
        }
      });
  }
}
