import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment'

import * as faker from 'faker';
import { ScreenSearch } from '../../core/models/screen-search';
import { EListingStatus, IPropertyListing, EPropertyStatus } from '../../core/models/property';
import { EPropertyType } from '../../core/enums/propertyTypes';
import { random } from 'faker';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {

  photos = ["https://ar.rdcpix.com/9f671b0d9d777b7969349649c112c5f2c-f50338554o.jpg",
    "https://ar.rdcpix.com/610e208fe79b9533c5e103166312b312c-f75218736o.jpg",
    "https://ar.rdcpix.com/610e208fe79b9533c5e103166312b312c-f3178227471o.jpg",
    "https://ar.rdcpix.com/610e208fe79b9533c5e103166312b312c-f3306091863o.jpg",
    "https://ar.rdcpix.com/610e208fe79b9533c5e103166312b312c-f1799178643o.jpg",
    "https://ar.rdcpix.com/9f671b0d9d777b7969349649c112c5f2c-f1582833307o.jpg",
    "https://ar.rdcpix.com/9f671b0d9d777b7969349649c112c5f2c-f1262947648o.jpg",
    "https://ar.rdcpix.com/9f671b0d9d777b7969349649c112c5f2c-f360433128o.jpg",
    "https://ar.rdcpix.com/85d4ed6a04e09b6e83debdd66843da26c-f89194533o.jpg",
    "https://ar.rdcpix.com/85d4ed6a04e09b6e83debdd66843da26c-f602017438o.jpg",
    "https://ar.rdcpix.com/85d4ed6a04e09b6e83debdd66843da26c-f703725924o.jpg",
    "https://ar.rdcpix.com/85d4ed6a04e09b6e83debdd66843da26c-f1521440412o.jpg",
    "https://ar.rdcpix.com/85d4ed6a04e09b6e83debdd66843da26c-f469864137o.jpg",
    "https://ar.rdcpix.com/85d4ed6a04e09b6e83debdd66843da26c-f4000060025o.jpg",
    "https://ar.rdcpix.com/85d4ed6a04e09b6e83debdd66843da26c-f1454317309o.jpg"
  ]

  constructor(private http: HttpClient) { }

  getPropertyListingsApi(searchCriteria: ScreenSearch, limit: number = 10, offset = 0): Promise<IPropertyListing[]> {
    return this.http.get<IPropertyListing[]>(environment.apiBase + "/properties/list-for-sale?city=Tampa&state_code=FL&limit=10&offset=0")
      .toPromise();
  }

  getPropertyListings(searchCriteria: ScreenSearch, limit: number = 10, offset = 0): Promise<IPropertyListing[]> {
    return new Promise((resolve, reject) => {
      let listings: IPropertyListing[] = [];

      for (let i = 0; i < limit; i++) {
        let listing: IPropertyListing = {
          propertyId: faker.random.number(1000000000),
          listingId: faker.random.number(1000000000),
          price: faker.random.number(1000000),
          list_date: faker.date.past(),
          last_update: faker.date.past(),
          year_built: faker.random.number({ min: 1950, max: 2020 }),
          listing_status: EListingStatus[<EListingStatus><unknown>(faker.helpers.replaceSymbolWithNumber(
            faker.random.arrayElement(Object.getOwnPropertyNames(EListingStatus))
          ))],
          beds: faker.random.number(4),
          baths: faker.random.number(2),
          baths_full: faker.random.number(3),
          prop_status: EPropertyStatus[<EPropertyStatus><unknown>(faker.helpers.replaceSymbolWithNumber(
            faker.random.arrayElement(Object.getOwnPropertyNames(EPropertyStatus))
          ))],
          propertyType: EPropertyType[<EPropertyType><unknown>(faker.helpers.replaceSymbolWithNumber(
            faker.random.arrayElement(Object.getOwnPropertyNames(EPropertyType))
          ))],
          address: {
            line: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            state_code: faker.address.stateAbbr(),
            postal_code: faker.address.zipCode(),
            neighborhood_name: faker.address.streetName(),
            // lat: +faker.address.latitude(),
            lat: faker.random.number({ min: 27.93, max: 27.97, precision: 0.001 }),
            // lon: +faker.address.longitude()
            lon: faker.random.number({ min: -82.50, max: -82.40, precision: 0.001 })
          },
          sqfeet: faker.random.number({ min: 700, max: 4000 }),
          thumbnailUrl: 
            this.photos[faker.random.number({ min: 0, max: this.photos.length - 1 })],
        }

        listings.push(listing);
      }

      setTimeout(() => {
        resolve(listings);
      }, 200);
    })
  }
}
