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

  @Input() listings: IPropertyListing[];
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
        .catch((e) => {
          console.log(e)
        })
    })
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

    this.screenerService.getPropertyListings(this.screenSearch, 30, 0)
      .then((listings) => {
        this.onNewListings.emit(listings);
        this.searchLocationChanged(this.screenSearch.location);
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
}
