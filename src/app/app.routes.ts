import {  Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroCityComponent } from './hero-city/hero-city.component';
import { CitiesComponent } from './cities/cities.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'cities', component: CitiesComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroesbycity/:id', component: HeroCityComponent },
  { path: '**', redirectTo: '/dashboard' }
];
