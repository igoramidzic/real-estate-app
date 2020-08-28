import { Component, Input, OnInit } from '@angular/core';
import { IPropertyAddress } from '../../../../core/models/address';

@Component({
  selector: 'app-property-details-address',
  templateUrl: './property-details-address.component.html',
  styleUrls: ['./property-details-address.component.scss']
})
export class PropertyDetailsAddressComponent implements OnInit {

  @Input() address: IPropertyAddress;

  constructor() { }

  ngOnInit(): void {
  }

}
