import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-screener',
  templateUrl: './screener.component.html',
  styleUrls: ['./screener.component.scss']
})
export class ScreenerComponent implements OnInit {

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  lat = 27.95;
  lng = -82.45;

  constructor() { }

  ngOnInit(): void {
  }
}
