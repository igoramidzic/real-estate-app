import { Component, OnInit, ViewChild } from '@angular/core';
import { IPropertyListing, IPropertyDetails } from '../../core/models/property';
import { ISearchLocation } from '../../core/models/location';
import { IScreenSearch } from '../../core/models/screen-search'
import { AgmMap } from '@agm/core';
import { EPropertyType } from 'src/app/core/enums/propertyTypes';
import { date } from 'faker';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.scss']
})
export class ScreenerComponent implements OnInit {

  listings: IPropertyListing[] = [];
  screenSearch: IScreenSearch;
  selectedListingId: number = 0;
  isLoading: boolean = false;

  selectedPropertyDetails: IPropertyDetails;

  showFullFilterWindow: boolean;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getPropertyDetailsFromUrl(params)
    });
  }

  newListings(listings: IPropertyListing[]): void {
    this.listings = listings;
  }

  screenSearchUpdated(screenSearch: IScreenSearch) {
    this.screenSearch = screenSearch;
  }

  updateSelection(newSelectedListingId: number) {
    this.selectedListingId = newSelectedListingId;
  }

  updateLoadingStatus(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  onOpenFullFilterWindow(): void {
    this.showFullFilterWindow = true;
  }

  onCloseFullFilterWindow(): void {
    this.showFullFilterWindow = false;
  }

  // call to api, if id dont exist from api call, remove it from url
  getPropertyDetailsFromUrl(params: Params): void {

    this.isLoading = true;

    // simulate api response time
    setTimeout(() => {
      this.selectedPropertyDetails = params["property"] ?
        {
          propertyId: params["property"]
        } :
        undefined;

      this.isLoading = false;
    }, 350);



  }

  resetPropertyDetails(): void {
    this.route.queryParams
      .subscribe(params => this.removePropertyFromQueryParams(params))
      .unsubscribe();
  }

  removePropertyFromQueryParams(params: Params): void {
    // update url without property query and without reloading
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          location: params['location'],
          priceMin: params['priceMin'],
          priceMax: params['priceMax'],
          beds: params['beds'],
          property: undefined
        },
        queryParamsHandling: 'merge'
      });
  }

}


