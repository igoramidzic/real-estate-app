import { Component, OnInit, ViewChild } from '@angular/core';
import { IPropertyListing } from '../../core/models/property';
import { ISearchLocation } from '../../core/models/location';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.scss']
})
export class ScreenerComponent implements OnInit {

  // will be imported from users preference 
  lat = 27.95;
  lon = -82.45;

  @ViewChild('map') map: AgmMap;

  listings: IPropertyListing[];
  markers: IMarker[];

  selectedListingId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  newListings(listings: IPropertyListing[]): void {
    // update list
    this.listings = listings;

    // update markers
    this.markers = this.listings.map((listing: IPropertyListing): IMarker => {
      return {
        lat: listing.address.lat,
        lon: listing.address.lon,
        id: listing.propertyId
      }
    });
  }

  newSearchLocation(searchLocation: ISearchLocation): void {
    this.lat = +searchLocation.lat;
    this.lon = +searchLocation.lng;
  }

  onMarkerClick(clickedId: number): void {
    this.selectedListingId = clickedId;
    console.log(this.selectedListingId)
  }
}

export interface IMarker {
  lat: number;
  lon: number;
  id: number;
}
