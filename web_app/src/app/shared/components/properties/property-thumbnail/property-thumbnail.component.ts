import { Component, Input, OnInit } from '@angular/core';
import { IPropertyListing } from 'src/app/core/models/property';

@Component({
  selector: 'app-property-thumbnail',
  templateUrl: './property-thumbnail.component.html',
  styleUrls: ['./property-thumbnail.component.scss']
})
export class PropertyThumbnailComponent implements OnInit {

  @Input() property: IPropertyListing;

  constructor() { }

  ngOnInit(): void {
  }

}
