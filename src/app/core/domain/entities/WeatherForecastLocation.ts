export class WeatherForecastLocation {
  constructor(
    public readonly id: string,
    public readonly locationName: string,
    public readonly locationAcronym: string,
    public readonly API_source: string
  ) {}
}
