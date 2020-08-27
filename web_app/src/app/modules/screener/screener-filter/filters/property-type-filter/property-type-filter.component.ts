import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-type-filter',
  templateUrl: './property-type-filter.component.html',
  styleUrls: ['./property-type-filter.component.scss']
})
export class PropertyTypeFilterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  click(): void {
    let type = Math.random() > 0.5 ? 'apartment' : 'house';
    this.router.navigate([], { queryParamsHandling: 'merge', queryParams: { propertyType: type } })
  }

}
