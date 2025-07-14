import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Base } from '../base';
import { Hero } from '../hero';
import { City } from '../city';

@Component({
  selector: 'app-generic-search',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './generic-search.component.html',
  styleUrl: './generic-search.component.css'
})
export class GenericSearchComponent<T extends Base> {

  @Input() searchTitle: string = '';
  @Input() route: string = '';         
  @Input() observables!: Observable<T[]>

  getDisplayName(name: Hero | City): string {
    if ('name' in name) {
      return name.name;
    } else if ('city' in name) {
      return name.city;
    } 
    return '';
  }
}



