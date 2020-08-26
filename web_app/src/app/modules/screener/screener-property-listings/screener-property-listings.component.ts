import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-screener-property-listings',
  templateUrl: './screener-property-listings.component.html',
  styleUrls: ['./screener-property-listings.component.scss']
})
export class ScreenerPropertyListingsComponent implements OnInit {

  @Input() listings;
  @Input() selectedId: number;
  @Output() thumbnailClick: EventEmitter<number> = new EventEmitter<number>();
  
  placeholderItems: number[] = [1, 2, 3, 4, 5, 6]

  constructor() { }

  ngOnInit(): void {
  }

  onThumbnailClick(selectedPropertyId: number) {
    this.thumbnailClick.emit(selectedPropertyId);
  }

}
