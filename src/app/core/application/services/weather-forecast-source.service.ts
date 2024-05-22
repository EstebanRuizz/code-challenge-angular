import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { WeatherForecastLocationService } from './weather-forecast-location.service';
import { WeatherForecastLocation } from '../../domain/entities/WeatherForecastLocation';
import { ISourceForecast } from '../interfaces/ISourceForecast';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastSourceService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly weatherForecastLocation: WeatherForecastLocationService
  ) {}

  public getWeatherForecastByLocationAcronym(locationAcronym: string): Observable<ISourceForecast> {
    return this.weatherForecastLocation.getByLocationAcronym(locationAcronym).pipe(
      switchMap((location: WeatherForecastLocation | null) =>
        this.handleLocation(location)
      ),
      catchError(() => this.handleError())
    );
  }

  private handleLocation(location: WeatherForecastLocation | null): Observable<ISourceForecast> {
    if (location) {
      return this.getSourceForecast(location);
    } else {
      return throwError(() => new Error('Location not found'));
    }
  }

  private handleError(): Observable<never> {
    return throwError(() => new Error('Error fetching location'));
  }

  private getSourceForecast(location: WeatherForecastLocation): Observable<ISourceForecast> {
    return this.httpClient.get<ISourceForecast>(location.API_source).pipe(
      catchError((error: any) => throwError(() => error))
    );
  }


}
