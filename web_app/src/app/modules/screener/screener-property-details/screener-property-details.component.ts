import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IPropertyDetails } from 'src/app/core/models/property';

@Component({
  selector: 'app-screener-property-details',
  templateUrl: './screener-property-details.component.html',
  styleUrls: ['./screener-property-details.component.scss']
})
export class ScreenerPropertyDetailsComponent implements OnInit {

  @Input() propertyDetails: IPropertyDetails;
  @Output() closeIconClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseIconClick(): void {
    this.closeIconClick.emit();
  }

}
