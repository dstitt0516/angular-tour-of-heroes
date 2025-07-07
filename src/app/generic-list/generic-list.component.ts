import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { City } from '../city';
import { Item } from '../item';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent<T extends Item> {

  @Input() searchTitle: string = '';
  @Input() route: string = '';         
  @Input() observables!: Observable<T[]>
}



