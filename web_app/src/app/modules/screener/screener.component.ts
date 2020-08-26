import { Component, OnInit, ViewChild } from '@angular/core';
import { IPropertyListing} from '../../core/models/property';
import { ISearchLocation } from '../../core/models/location';
import {IScreenSearch} from '../../core/models/screen-search'
import { AgmMap } from '@agm/core';
import { EPropertyType } from 'src/app/core/enums/propertyTypes';
import { date } from 'faker';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.scss']
})
export class ScreenerComponent implements OnInit {

  listings: IPropertyListing[] = [];
  screenSearch: IScreenSearch;
  selectedListingId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  newListings(listings: IPropertyListing[]): void {
    this.listings = listings;
  }

  screenSearchUpdated(screenSearch: IScreenSearch) {
    this.screenSearch = screenSearch;
  }
}


