import { AsyncPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { City, Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [ RouterLink, NgFor, AsyncPipe],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  cities$!: Observable<City[]>;
  private heroSearchTerms = new Subject<string>();
  private citySearchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  /** Push a search term into the observable stream. */

  citySearch(cityTerm: string): void {
    this.citySearchTerms.next(cityTerm);
  }

  heroSearch(heroTerm: string): void {
    this.heroSearchTerms.next(heroTerm);
  }

  ngOnInit(): void {
    this.heroes$ = this.heroSearchTerms
      .pipe(
        /** wait 300ms after each keystroke before considering the term */
        debounceTime(300),

        /** ignore new term if same as previous term */
        distinctUntilChanged(),

        /** switch to new search observable each time the term changes */
        switchMap((heroTerm: string) => this.heroService.searchHeroes(heroTerm)),
      );

    this.cities$ = this.citySearchTerms
      .pipe(
        /** wait 300ms after each keystroke before considering the term */
        debounceTime(300),

        /** ignore new term if same as previous term */
        distinctUntilChanged(),

        /** switch to new search observable each time the term changes */
        switchMap((cityTerm: string) => this.heroService.searchHeroCities(cityTerm)),
      );
  }
}
