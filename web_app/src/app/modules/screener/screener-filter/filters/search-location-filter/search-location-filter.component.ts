import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ISearchLocation } from '../../../../../core/models/location';
import { CitiesService } from '../../../../../services/cities/cities.service';
import { IPropertyListing } from '../../../../../core/models/property';

@Component({
  selector: 'app-search-location-filter',
  templateUrl: './search-location-filter.component.html',
  styleUrls: ['./search-location-filter.component.scss']
})
export class SearchLocationFilterComponent implements OnInit, OnChanges {

  @Input() listings: IPropertyListing[];
  @Input() searchLocation: ISearchLocation;
  @Output() searchLocationChosen: EventEmitter<ISearchLocation> = new EventEmitter();

  citySearchPrefix: string;
  searchLocations: ISearchLocation[];
  timer;

  constructor(private citiesService: CitiesService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchLocation && changes.searchLocation.previousValue != changes.searchLocation.currentValue)
      this.resetForm();
  }

  resetForm(): void {
    this.citySearchPrefix = '';
    this.searchLocations = null;
  }

  ngOnInit(): void {
    this.initializeCitySearchPrefix();
  }

  initializeCitySearchPrefix(): void {
    this.citySearchPrefix = '';
  }

  queryCitiesAfterTimerExpires(): void {
    clearTimeout(this.timer);

    // Make a new timeout set to go off in 500ms
    this.timer = setTimeout(() => {
      this.getCities()
    }, 500);
  }

  async getCities(): Promise<void> {
    if (this.citySearchPrefix == "") {
      this.searchLocations = null;
      return;
    };
    this.searchLocations = (await this.citiesService.getCitiesFromPrefix(this.citySearchPrefix)).splice(0, 5);
  }

  chooseLocation(location: ISearchLocation): void {
    this.searchLocationChosen.emit(location);
  }

  getFullStringOfLocation(searchLocation: ISearchLocation): string {
    return this.citiesService.getFullCityStateName(searchLocation);
  }

  get showNoLocationsMessage(): boolean {
    return (this.searchLocations && this.searchLocations.length == 0);
  }
}
