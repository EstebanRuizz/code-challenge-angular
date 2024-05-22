import { TestBed } from '@angular/core/testing';

import { WeatherForecastSourceService } from './weather-forecast-source.service';

describe('WeatherForecastSourceService', () => {
  let service: WeatherForecastSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherForecastSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
