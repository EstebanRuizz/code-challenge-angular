import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
})
export class WeatherComponent implements OnInit {
  private location: string = '';

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.location = params['location'];
      console.log(this.location);
    });
  }
}
