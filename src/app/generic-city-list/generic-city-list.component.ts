import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-generic-city-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-city-list.component.html',
  styleUrl: './generic-city-list.component.css'
})
export class GenericCityListComponent<T extends City> implements OnInit {
    
  cities: City[] = [];

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.cityService.getCities().subscribe(cities => this.cities = cities);
  }

  @Input() cityList: T[] = [];
}
