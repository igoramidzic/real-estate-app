import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-more-filters',
  templateUrl: './more-filters.component.html',
  styleUrls: ['./more-filters.component.scss']
})
export class MoreFiltersComponent implements OnInit {

  @Output() moreFiltersClicked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  click(): void {
    this.moreFiltersClicked.emit(true);
  }
}
