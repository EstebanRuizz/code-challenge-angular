import { Component, OnInit } from '@angular/core';
import { WeatherForecastLocationService } from '../../../core/application/services/weather-forecast-location.service';
import { WeatherForecastLocation } from '../../../core/domain/entities/WeatherForecastLocation';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private readonly toast: ToastrService,
    private readonly weatherForecastLocation: WeatherForecastLocationService
  ) {}

  public ngOnInit(): void {
    this.loadLocations();
  }

  private loadLocations(): void {
    this.weatherForecastLocation.getAll().subscribe({
      next: (weatherLocations: WeatherForecastLocation[]) => {
        this.weatherLocations = weatherLocations;
        this.notifyElementsLoaded();
      },
      error: () => this.notFoundWeatherLocation(),
    });
  }

  private notifyElementsLoaded(): void {
    this.toast.success('Locations loaded successfully');
  }

  private notFoundWeatherLocation(): void {
    this.toast.warning('There are no locations available right now');
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
}
