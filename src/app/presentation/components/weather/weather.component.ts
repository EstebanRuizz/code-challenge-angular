import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { WeatherForecastSourceService } from '../../../core/application/services/weather-forecast-source.service';
import {
  ISourceForecast,
  Period,
} from '../../../core/application/interfaces/ISourceForecast';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  public location: string = '';
  public locationFounded: boolean = false;
  public sourceForecast!: ISourceForecast;

  constructor(
    private readonly router: Router,
    private readonly toast: ToastrService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly weatherForecastSource: WeatherForecastSourceService
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.location = params['location'];
      this.weatherForecastSource
        .getWeatherForecastByLocationAcronym(this.location)
        .subscribe({
          next: (sourceForecast: ISourceForecast) => {
            this.sourceForecast = sourceForecast;
            this.locationFounded = true;
            this.toastLoadedWeatherLocation();
            this.loadDataChartLine();
          },
          error: () => this.unAbleTpLoadWeatherLocationData(),
        });
    });
  }

  private toastLoadedWeatherLocation() {
    this.toast.success(`Weather location loaded successfully!`);
  }

  public unAbleTpLoadWeatherLocationData(): void {
    this.locationFounded = false;
    this.toast.error('The provided location acronym was not founded');
  }

  private loadDataChartLine(): void {
    this.lineChartData = {
      labels: this.sourceForecast.properties.periods.map(
        (period: Period) => period.name
      ),
      datasets: [
        {
          data: this.sourceForecast.properties.periods.map(
            (period: Period) => period.temperature
          ),
          label: `Temperatures for this week on ${this.location}`,
          fill: true,
          animation: {
            duration: 1000,
            easing: 'easeOutElastic',
            delay: 0,
            loop: false,
          },
          tension: 0.5,
          borderWidth: 5,
          borderColor: 'rgb(55,55,150)',
          backgroundColor: 'transparent',
          hoverBackgroundColor: 'gray',
          borderCapStyle: 'round',
          pointRadius: 13,
          pointHitRadius: 100,
          pointBorderWidth: 1,
          pointStyle: 'circle',
          pointHoverRadius: 10,
          pointHoverBorderWidth: 12,
          pointBackgroundColor: 'white',
          pointBorderColor: 'rgb(55,55,150)',
          pointHoverBackgroundColor: 'rgb(55,55,150)',
          borderJoinStyle: 'round',
          hoverBorderDash: [80],
        },
      ],
    };
  }

  public lineChartLegend = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        pointBorderWidth: 4,
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    scales: {
      y: {
        ticks: {
          color: 'green',
          font: { size: 14, family: 'Arial', weight: 'lighter' },
          callback: (value, index, values) => `${value}° F`,
          align: 'start',
          padding: 13,
        },
        title: {
          display: true,
          align: 'center',
          text: 'Fahrenheit',
          font: {
            family: 'Arial',
            size: 20,
            weight: 'bold',
          },
          padding: {
            top: 2,
            bottom: 10,
          },
        },
      },
      x: {
        ticks: {
          color: 'black',
          padding: 13,
          align: 'center',
          font: { weight: 'lighter' },
        },
        title: {
          display: true,
          align: 'center',
          text: `Next 7 days & nights`,
          font: {
            family: 'Arial',
            size: 20,
            weight: 'bold',
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'black',
          font: {
            size: 24,
            family: 'Arial',
            style: 'normal',
            weight: 'bold',
          },
          padding: 10,
          pointStyleWidth: 300,
          boxPadding: 30,
          boxWidth: 20,
          boxHeight: 20,
          useBorderRadius: true,
          borderRadius: 10,
          textAlign: 'center',
        },
      },
      tooltip: {
        bodyFont: {
          family: 'Arial',
          size: 16,
        },
        titleFont: {
          family: 'Arial',
          size: 18,
        },
        boxPadding: 5,

        titleColor: 'black',
        bodyColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        bodyAlign: 'center',
        backgroundColor: 'white',
      },
    },
  };

  public goHome(): void {
    this.router.navigate(['']);
  }
}
