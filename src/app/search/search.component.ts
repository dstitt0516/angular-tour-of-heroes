import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { City } from '../city';
import { HeroService } from '../services/hero.service';
import { CityService } from '../services/city.service';
import { GenericSearchComponent } from "../generic-search/generic-search.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [GenericSearchComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  cities$!: Observable<City[]>;
  private heroSearchTerms = new Subject<string>();
  private citySearchTerms = new Subject<string>();

  constructor(private heroService: HeroService, private cityService: CityService) {}

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
        
        debounceTime(300),
      
        distinctUntilChanged(),

        switchMap((heroTerm: string) => this.heroService.searchHeroes(heroTerm)),
      );

    this.cities$ = this.citySearchTerms
      .pipe(
        
        debounceTime(300),

        distinctUntilChanged(),
       
        switchMap((cityTerm: string) => this.cityService.searchHeroCities(cityTerm)),
      );
  }
}
