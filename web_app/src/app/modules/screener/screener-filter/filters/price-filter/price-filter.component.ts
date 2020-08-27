import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  click(): void {
    let min = 150000 - Math.floor(Math.random() * 50000);
    let max = 150000 + Math.floor(Math.random() * 50000);
    this.router.navigate([], { queryParamsHandling: 'merge', queryParams: { priceMin: min, priceMax: max } })
  }
}
