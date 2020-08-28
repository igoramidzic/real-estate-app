import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IPropertyDetails } from 'src/app/core/models/property';
import { ScreenerService } from '../../../services/screener/screener.service';

@Component({
  selector: 'app-screener-property-details',
  templateUrl: './screener-property-details.component.html',
  styleUrls: ['./screener-property-details.component.scss']
})
export class ScreenerPropertyDetailsComponent implements OnInit {

  @Input() propertyId: string;
  propertyDetails: IPropertyDetails;
  propertyNotFound: boolean;
  isLoading: boolean;

  @Output() closeIconClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private screenerService: ScreenerService) { }

  ngOnInit(): void {
    this.getListingDetails();
  }

  async getListingDetails(): Promise<void> {
    this.propertyNotFound = false;
    this.isLoading = true;
    try {
      this.propertyDetails = await this.screenerService.getListingDetails(this.propertyId);

      // Check if the response was successful but also returned a null property. Rare case.
      if (!this.propertyDetails) {
        throw new Error('Property not found.');
      }
    } catch (e) {
      this.propertyNotFound = true;
    }

    this.isLoading = false;
  }

  onCloseIconClick(): void {
    this.closeIconClick.emit();
  }

}
