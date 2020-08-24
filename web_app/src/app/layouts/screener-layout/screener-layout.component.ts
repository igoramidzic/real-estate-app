import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-screener-layout',
  templateUrl: './screener-layout.component.html',
  styleUrls: ['./screener-layout.component.scss']
})
export class ScreenerLayoutComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  constructor() { }

  ngOnInit(): void {
  }

  center = { lat: 27.95, lng: -82.5 };
  markerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 10;
  display?: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  move(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    this.markerPositions.pop();
  }
}
