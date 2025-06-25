import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [ NgFor, RouterLink ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent implements OnInit {

  @Input() heroes!:Hero[]

  ngOnInit(): void {
    console.log(this.heroes)
  }

  constructor( private heroService: HeroService ) {}

  delete(heroToDelete: Hero): void {
      this.heroes = this.heroes.filter(hero => hero !== heroToDelete);
      this.heroService.deleteHero(heroToDelete.id)
        .subscribe();
    }

}
