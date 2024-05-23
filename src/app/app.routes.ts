import { Routes } from '@angular/router';
import { HomeComponent } from './presentation/components/home/home.component';
import { WeatherComponent } from './presentation/components/weather/weather.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'weather/:location',
    loadComponent: () =>
      import('./presentation/components/weather/weather.component').then(
        (c) => c.WeatherComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
