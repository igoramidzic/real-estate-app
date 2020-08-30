import { Component, Input, OnInit } from '@angular/core';
import { IPropertyListing } from 'src/app/core/models/property';

@Component({
  selector: 'app-marker-info-card',
  templateUrl: './marker-info-card.component.html',
  styleUrls: ['./marker-info-card.component.scss']
})
export class MarkerInfoCardComponent implements OnInit {

  @Input() propertyListing: IPropertyListing;

  constructor() { }

  ngOnInit(): void {
  }

}
