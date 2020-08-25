import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ScreenerService } from 'src/app/services/screener/screener.service';
import { IProperty } from '../../../core/models/property';
import { ScreenSearch } from '../../../core/models/screen-search';

@Component({
  selector: 'app-screener-filter',
  templateUrl: './screener-filter.component.html',
  styleUrls: ['./screener-filter.component.scss']
})
export class ScreenerFilterComponent implements OnInit {

  @Output() onNewListings: EventEmitter<IProperty[]> = new EventEmitter();

  constructor(private screenerService: ScreenerService) { }

  ngOnInit(): void {
  }

  search(): void {
    let screenSearch: ScreenSearch = {
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
    }

    this.screenerService.getPropertyListings(screenSearch, 10)
      .then((listings) => {
        this.onNewListings.emit(listings);
      })
      .catch((e) => console.log(e));
  }
}
