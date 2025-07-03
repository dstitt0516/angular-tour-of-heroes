import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent<T> {

  constructor (private router: Router) {}

  @Input() searchTitle: string = '';
  @Input() route: string = '';
  @Input() observables!: Observable<T[]>
}



