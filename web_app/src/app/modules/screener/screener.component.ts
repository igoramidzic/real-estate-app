import { Component, OnInit, ViewChild } from '@angular/core';
import { IPropertyListing } from '../../core/models/property';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.scss']
})
export class ScreenerComponent implements OnInit {

  // will be imported from users preference 
  lat = 27.95;
  lon = -82.45;
  radius = 10000;

  listings: IPropertyListing[];
  markers: IMarker[];

  constructor() { }

  ngOnInit(): void {
  }

  newListings(listings: IPropertyListing[]): void {
    // update list
    this.listings = listings;

    // update markers
    this.markers = this.listings.map((listing: IPropertyListing) : IMarker => {
      return {
        lat: listing.address.lat,
        lon: listing.address.lon,
        id: listing.propertyId
      }
    });

    // console.log(this.markers);
  }
}

export interface IMarker {
  lat: number;
	lon: number;
	id: number; 
}
