import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ScreenerService } from 'src/app/services/screener/screener.service';
import { IPropertyListing } from '../../../core/models/property';
import { ScreenSearch as IScreenSearch } from '../../../core/models/screen-search';
import { ISearchLocation } from '../../../core/models/location';

@Component({
  selector: 'app-screener-filter',
  templateUrl: './screener-filter.component.html',
  styleUrls: ['./screener-filter.component.scss']
})
export class ScreenerFilterComponent implements OnInit {

  screenSearch: IScreenSearch;

  @Output() onNewListings: EventEmitter<IPropertyListing[]> = new EventEmitter();
  @Output() onNewSearchLocation: EventEmitter<ISearchLocation> = new EventEmitter();

  constructor(private screenerService: ScreenerService, private citiesService: CitiesService) { }

  ngOnInit(): void {

  }

  initializeScreenSearch(): void {
    this.screenSearch = {
      saleType: [],
      propertyTypes: [],
      priceMin: 245823,
      priceMax: 325823,
      bedroomCount: [],
      location: {
        city: '',
        state: '',
        state_full_name: '',
        lat: 27,
        lng: -83
      },
      amenities: []
    };
  }

  search(): void {
    this.screenerService.getPropertyListings(this.screenSearch, 20, 0)
      .then((listings) => {
        this.onNewListings.emit(listings);

      })
      .catch((e) => console.log(e));
  }

  searchLocationChanged(searchLocation: ISearchLocation): void {
    this.initializeScreenSearch();
    this.screenSearch.location = searchLocation;
    this.search();
    this.onNewSearchLocation.emit(searchLocation);
  }
}
