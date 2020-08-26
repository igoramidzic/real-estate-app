import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISearchLocation } from 'src/app/core/models/location';
import { CitiesService } from 'src/app/services/cities/cities.service';

@Component({
  selector: 'app-initial-city-location-chooser',
  templateUrl: './initial-city-location-chooser.component.html',
  styleUrls: ['./initial-city-location-chooser.component.scss']
})
export class InitialCityLocationChooserComponent implements OnInit {

  citySearchPrefix: string;
  searchLocations: ISearchLocation[];
  timer;

  @Output() searchLocationChanged: EventEmitter<ISearchLocation> = new EventEmitter();

  constructor(private citiesService: CitiesService) { }

  ngOnInit(): void {

  }

  queryCitiesAfterTimerExpires(): void {
    clearTimeout(this.timer);

    // Make a new timeout set to go off in 500ms
    this.timer = setTimeout(() => {
      this.getCities()
    }, 500);
  }

  async getCities(): Promise<void> {
    if (this.citySearchPrefix == "") return;
    this.searchLocations = (await this.citiesService.getCitiesFromPrefix(this.citySearchPrefix));
  }

  chooseLocation(location: ISearchLocation): void {
    this.citySearchPrefix = this.getFullStringOfLocation(location);
    this.searchLocationChanged.emit(location);
  }

  getFullStringOfLocation(location: ISearchLocation): string {
    return location.city + ", " + location.state;
  }

  get showNoLocationsMessage(): boolean {
    return (this.searchLocations && this.searchLocations.length == 0);
  }

}
