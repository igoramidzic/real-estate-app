import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPropertyDetails } from 'src/app/core/models/property';
import { ScreenerService } from '../../../services/screener/screener.service';

@Component({
  selector: 'app-screener-property-details',
  templateUrl: './screener-property-details.component.html',
  styleUrls: ['./screener-property-details.component.scss']
})
export class ScreenerPropertyDetailsComponent implements OnInit, OnDestroy {

  @Input() propertyId: string;
  propertyDetails: IPropertyDetails;
  propertyNotFound: boolean;
  isLoading: boolean;

  propertyChangeSubscription: Subscription;

  @Output() closeIconClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private screenerService: ScreenerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyChangeSubscription = this.route.queryParams.subscribe(params => {
      this.getListingDetails();
    })
  }

  ngOnDestroy(): void {
    this.propertyChangeSubscription.unsubscribe();
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
