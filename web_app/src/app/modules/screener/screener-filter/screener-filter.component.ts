import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ScreenerService } from 'src/app/services/screener/screener.service';
import { IPropertyListing } from '../../../core/models/property';
import { IScreenSearch } from '../../../core/models/screen-search';
import { ISearchLocation } from '../../../core/models/location';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-screener-filter',
  templateUrl: './screener-filter.component.html',
  styleUrls: ['./screener-filter.component.scss']
})
export class ScreenerFilterComponent implements OnInit {

  screenSearch: IScreenSearch;

  @Output() onNewListings: EventEmitter<IPropertyListing[]> = new EventEmitter();
  @Output() screenSearchUpdated: EventEmitter<IScreenSearch> = new EventEmitter();

  constructor(private screenerService: ScreenerService, private route: ActivatedRoute,
    private router: Router, private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.initializeScreenSearchFromQueryParams(params)
        .then(() => {
          this.search();
        })
    })
  }

  async initializeScreenSearchFromQueryParams(params: Params) {
    let searchLocation: ISearchLocation;
    try {
      searchLocation = await this.getSearchLocationFromCityState(params['location']);
      console.log(searchLocation)
    } catch (e) {
      this.resetFilter();
    }
    this.screenSearch = {
      saleType: [],
      propertyTypes: [],
      priceMin: 245823,
      priceMax: 325823,
      bedroomCount: [],
      location: searchLocation,
      amenities: []
    };
  }

  search(): void {
    if (!this.screenSearch.location) return;
    console.log(this.screenSearch)

    this.screenerService.getPropertyListings(this.screenSearch, 20, 0)
      .then((listings) => {
        this.onNewListings.emit(listings);
        this.searchLocationChanged(this.screenSearch.location);
      })
      .catch((e) => console.log(e));
  }

  searchLocationChanged(searchLocation: ISearchLocation): void {
    console.log(searchLocation)
    this.screenSearch.location = searchLocation;
    this.screenSearchUpdated.emit(this.screenSearch);
    this.router.navigate([], { queryParams: { location: this.getFullLocationString(searchLocation) } })
  }

  resetFilter(): void {
    this.router.navigate([]);
  }

  async getSearchLocationFromCityState(cityState: string): Promise<ISearchLocation> {
    if (cityState == null) return null;

    try {
      return await this.citiesService.getSearchLocationFromCityState(cityState);
    } catch (e) {
      throw new Error('Could not find this city.');
    }
  }

  getFullLocationString(searchLocation: ISearchLocation): string {
    const { city, state } = searchLocation;
    return city + ',' + state;
  }
}
