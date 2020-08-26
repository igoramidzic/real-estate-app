import { Component, OnInit, OnChanges, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AgmMap } from '@agm/core';
import { IPropertyListing } from 'src/app/core/models/property';
import { ISearchLocation } from 'src/app/core/models/location';
import { CitiesService } from '../../../services/cities/cities.service';

@Component({
  selector: 'app-screener-map',
  templateUrl: './screener-map.component.html',
  styleUrls: ['./screener-map.component.scss']
})
export class ScreenerMapComponent implements OnInit, OnChanges {

  @Input() searchLocation: ISearchLocation;
  @Input() listings: IPropertyListing[];
  @Input() selectedListingId: number;
  @Output() markerClick: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('map') map: AgmMap;

  zoom: number = 4;
  minZoom: number = 4;

  constructor(public citiesService: CitiesService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchLocation && changes.searchLocation.previousValue != changes.searchLocation.currentValue) {
      setTimeout(() => {
        this.zoom = 12;
      }, 1000);
    }
  }

  ngOnInit(): void {
  }

  onMarkerClick(clickedId: number): void {
    this.markerClick.emit(clickedId);
    // document.getElementById(clickedId.toString()).scrollIntoView();
  }

  zoomChanged(zoom): void {
    this.zoom = zoom;
  }
}
