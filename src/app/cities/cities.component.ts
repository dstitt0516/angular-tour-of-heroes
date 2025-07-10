import { Component, OnInit } from '@angular/core';
import { City } from '../city';
import { CityService } from '../services/city.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [ NgFor, RouterLink ],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent implements OnInit {

  cities: City[] = [];
  city = { cityid: 1 };

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.getCities()
  }

  getCities(): void {
    this.cityService.getCities()
      .subscribe((cities) => {
        this.cities = cities
      });
  }

  addCity(name: string): void {
    if (
      typeof name !== 'string' || 
      name.length < 1 ||
      this.cities.some(city => city.name.toLowerCase() === name.toLowerCase())
    ) { 
      return;
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);
    
    this.cityService.addCity({ name } as City)
      .subscribe(city => {
        this.cities.push(city);
        this.getCities();
      });
  }
}
