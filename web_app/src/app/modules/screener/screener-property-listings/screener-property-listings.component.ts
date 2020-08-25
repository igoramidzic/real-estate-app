import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-screener-property-listings',
  templateUrl: './screener-property-listings.component.html',
  styleUrls: ['./screener-property-listings.component.scss']
})
export class ScreenerPropertyListingsComponent implements OnInit {

  @Input() listings;
  placeholderItems: number[] = [1, 2, 3, 4, 5, 6]

  constructor() { }

  ngOnInit(): void {
  }

}
