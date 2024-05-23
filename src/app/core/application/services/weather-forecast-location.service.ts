import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IRepositoryAsync } from '../interfaces/IRepositoryAsync';
import { WeatherForecastLocation } from '../../domain/entities/WeatherForecastLocation';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastLocationService
  implements IRepositoryAsync<WeatherForecastLocation>
{
  private weatherForecastLocation: WeatherForecastLocation[] = [
    new WeatherForecastLocation(
      'b04df02b-ee05-4181-830e-99b6b54ed8ac',
      'District of Columbia',
      'LWX',
      'https://api.weather.gov/gridpoints/LWX/31,80/forecast'
    ),
    new WeatherForecastLocation(
      'c3720c4d-b251-457c-9606-8d17a6e910f2',
      'Kansas',
      'TOP',
      'https://api.weather.gov/gridpoints/TOP/31,80/forecast'
    ),
  ];

  public getAll(): Observable<WeatherForecastLocation[]> {
    return of(this.weatherForecastLocation);
  }

  public getById(id: string): Observable<WeatherForecastLocation | null> {
    const location = this.weatherForecastLocation.find(
      (location) => location.id.toUpperCase() === id.toUpperCase()
    );
    return of(location ?? null);
  }

  public getByLocationAcronym(
    acronym: string
  ): Observable<WeatherForecastLocation | null> {
    const location = this.weatherForecastLocation.find(
      (location) =>
        location.locationAcronym.toUpperCase() === acronym.toUpperCase()
    );
    return of(location ?? null);
  }

  public getPaginated(
    page: number,
    pageSize: number
  ): Observable<WeatherForecastLocation[]> {
    throw new Error('Method not implemented.');
  }
}
