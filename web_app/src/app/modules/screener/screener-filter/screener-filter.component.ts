import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ScreenerService } from 'src/app/services/screener/screener.service';
import { IPropertyListing } from '../../../core/models/property';
import { IScreenSearch } from '../../../core/models/screen-search';
import { ISearchLocation } from '../../../core/models/location';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ESaleType } from 'src/app/core/enums/saleTypes';
import { EPropertyType } from 'src/app/core/enums/propertyTypes';
import { EBedroomCount } from 'src/app/core/enums/bedroomCount';

@Component({
  selector: 'app-screener-filter',
  templateUrl: './screener-filter.component.html',
  styleUrls: ['./screener-filter.component.scss']
})
export class ScreenerFilterComponent implements OnInit {

  screenSearch: IScreenSearch;
  showFullFilterWindow: boolean;

  queryParamFilter: IQueryParamFilter;

  @Input() listings: IPropertyListing[];
  @Output() onNewListings: EventEmitter<IPropertyListing[]> = new EventEmitter();
  @Output() screenSearchUpdated: EventEmitter<IScreenSearch> = new EventEmitter();
  @Output() fetchingData: EventEmitter<boolean> = new EventEmitter();
  @Output() fullFilterWindowOpened: EventEmitter<boolean> = new EventEmitter();
  @Output() fullFilterWindowClosed: EventEmitter<boolean> = new EventEmitter();

  constructor(private screenerService: ScreenerService, private route: ActivatedRoute,
    private router: Router, private citiesService: CitiesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.onQueryParamsChange(params);
    })
  }

  // These are the query parameters that we care if change. Other's we can ignore.
  generateQueryParamFilterObject(params): IQueryParamFilter {
    let queryParamFilter: IQueryParamFilter = {};

    queryParamFilter.location = params['location'];
    queryParamFilter.priceMin = params['priceMin'];
    queryParamFilter.priceMax = params['priceMax'];
    queryParamFilter.beds = params['beds'];
    queryParamFilter.propertyType = params['propertyType'];

    return queryParamFilter;
  }

  queryParamFilterObjectsAreDifferent(qpf1: IQueryParamFilter, qpf2: IQueryParamFilter): boolean {
    return JSON.stringify(qpf1) != JSON.stringify(qpf2);
  }

  onQueryParamsChange(params: Params): void {
    let newQueryParamFilter: IQueryParamFilter = this.generateQueryParamFilterObject(params);

    if (this.queryParamFilterObjectsAreDifferent(newQueryParamFilter, this.queryParamFilter)) {
      this.initializeScreenSearchFromQueryParams(params)
        .then(() => {
          this.search();
        })
        .catch((e) => {
          console.log(e)
        })
    } else {

    }

    this.queryParamFilter = newQueryParamFilter;
  }

  async initializeScreenSearchFromQueryParams(params: Params) {
    let searchLocation: ISearchLocation;
    try {
      searchLocation = await this.getSearchLocationFromCityState(params['location']);
    } catch {
    }

    this.screenSearch = {
      saleType: ESaleType.Buy,
      propertyTypes: [EPropertyType.House],
      priceMin: 0,
      priceMax: 0,
      bedroomCount: [EBedroomCount.Two],
      location: searchLocation,
      amenities: []
    };

    this.screenSearchUpdated.emit(this.screenSearch);
  }

  search(): void {
    if (!this.screenSearch.location) return;

    this.fetchingData.emit(true);

    this.screenerService.getPropertyListings(this.screenSearch, 30, 0)
      .then((listings) => {
        this.onNewListings.emit(listings);
        this.searchLocationChanged(this.screenSearch.location);

        this.fetchingData.emit(false);
      })
      .catch((e) => console.log(e));
  }

  searchLocationChanged(searchLocation: ISearchLocation): void {
    this.screenSearch.location = searchLocation;
    // this.screenSearchUpdated.emit(this.screenSearch);
    this.router.navigate([], { queryParamsHandling: 'merge', queryParams: { location: this.getFullLocationString(searchLocation) } })
  }

  resetFilter(): void {
    this.router.navigate([]);
  }

  async getSearchLocationFromCityState(cityState: string): Promise<ISearchLocation> {
    if (cityState == null) return null;

    try {
      return await this.citiesService.getSearchLocationFromCityState(cityState);
    } catch (e) {
      return null;
    }
  }

  getFullLocationString(searchLocation: ISearchLocation): string {
    const { city, state } = searchLocation;
    return city + ',' + state;
  }

  toggleFullFilterWindow(): void {
    this.showFullFilterWindow = !this.showFullFilterWindow;
    this.showFullFilterWindow ? this.fullFilterWindowOpened.emit(true) : this.fullFilterWindowClosed.emit(true);
  }

  closeFullFilterWindow(): void {
    this.showFullFilterWindow = false;
    this.fullFilterWindowClosed.emit(true);
  }
}

interface IQueryParamFilter {
  location?: string;
  priceMin?: string;
  priceMax?: string;
  beds?: string;
  propertyType?: string;
}