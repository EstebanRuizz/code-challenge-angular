import { Component, OnInit } from '@angular/core';
import { WeatherForecastLocationService } from '../../../core/application/services/weather-forecast-location.service';
import { WeatherForecastLocation } from '../../../core/domain/entities/WeatherForecastLocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public weatherLocations: WeatherForecastLocation[] = [];

  constructor(
    private readonly router: Router,
    private readonly weatherForecastLocation: WeatherForecastLocationService
  ) {}

  public ngOnInit(): void {
    this.loadLocations();
  }

  public viewForecastByAcronym(id: string): void {
    this.weatherForecastLocation.getById(id).subscribe({
      next: (location: WeatherForecastLocation | null) => {
        location
          ? this.router.navigate(['weather', location.locationAcronym])
          : this.notFoundWeatherLocation();
      },
      error: (err) => this.notFoundWeatherLocation(),
    });
  }

  public notFoundWeatherLocation() {
    throw new Error('Method not implemented.');
  }

  private loadLocations() {
    this.weatherForecastLocation.getAll().subscribe({
      next: (weatherLocations) => (this.weatherLocations = weatherLocations),
      error: (err) => console.log('error'),
    });
  }
}
