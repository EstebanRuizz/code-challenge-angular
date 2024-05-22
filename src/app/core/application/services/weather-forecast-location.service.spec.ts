import { TestBed } from '@angular/core/testing';

import { WeatherForecastLocationService } from './weather-forecast-location.service';

describe('WeatherForecastLocationService', () => {
  let service: WeatherForecastLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherForecastLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
