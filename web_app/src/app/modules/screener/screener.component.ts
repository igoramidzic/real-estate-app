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

  listings: IPropertyListing[];
  screenSearch: IScreenSearch;
  selectedListingId: number = 0;
  isLoading: boolean = false;

  selectedPropertyDetails: IPropertyDetails;

  showFullFilterWindow: boolean;
  showPropertyDetailsWindow: boolean;
  selectedPropertyId: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['property']) {
        this.showPropertyDetailsWindow = true;
        this.selectedPropertyId = params['property'];
      } else {
        this.showPropertyDetailsWindow = false;
        this.selectedPropertyId = null;
      }
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
          property: undefined
        },
        queryParamsHandling: 'merge'
      });
  }

  getPropertyFromPropertyDetails(): IPropertyListing {
    if (this.selectedPropertyDetails) {

      let matchingListing = this.listings.filter(x => x.propertyId === this.selectedPropertyDetails.propertyId);

      if (matchingListing.length > 0) {
        return matchingListing[0];
      }
    }

    return undefined;
  }

}


