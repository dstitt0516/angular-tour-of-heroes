import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent<T extends City> implements OnInit {
    
  cities: City[] = [];

  constructor(
    private cityService: CityService,
  ) {}

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.cityService.getCities().subscribe(cities => this.cities = cities);
  }

  @Input() cityList: T[] = [];
}
