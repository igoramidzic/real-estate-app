import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beds-filter',
  templateUrl: './beds-filter.component.html',
  styleUrls: ['./beds-filter.component.scss']
})
export class BedsFilterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  click(): void {
    let beds = Math.floor(Math.random() * 3) + 1;
    this.router.navigate([], { queryParamsHandling: 'merge', queryParams: { beds: beds } })
  }
}
