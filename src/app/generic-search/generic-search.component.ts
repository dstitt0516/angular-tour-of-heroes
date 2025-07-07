import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../item';

@Component({
  selector: 'app-generic-search',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './generic-search.component.html',
  styleUrl: './generic-search.component.css'
})
export class GenericSearchComponent<T extends Item> {

  @Input() searchTitle: string = '';
  @Input() route: string = '';         
  @Input() observables!: Observable<T[]>
}



