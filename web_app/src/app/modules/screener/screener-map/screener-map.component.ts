import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AgmMap } from '@agm/core';
import { IPropertyListing } from 'src/app/core/models/property';
import { ISearchLocation } from 'src/app/core/models/location';

@Component({
  selector: 'app-screener-map',
  templateUrl: './screener-map.component.html',
  styleUrls: ['./screener-map.component.scss']
})
export class ScreenerMapComponent implements OnInit {

  @Input() searchLocation: ISearchLocation;
  @Input() listings: IPropertyListing[];
  @Input() selectedListingId: number;
  @Output() markerClick: EventEmitter<number> = new EventEmitter<number>();

  // will be imported from users preference 
  // lat = 27.95;
  // lon = -82.45;

  @ViewChild('map') map: AgmMap;

  constructor() { }


  onMarkerClick(clickedId: number): void {
    this.markerClick.emit(clickedId);
    document.getElementById(clickedId.toString()).scrollIntoView();
  }

  ngOnInit(): void {
  }

}
