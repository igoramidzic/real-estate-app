import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import * as faker from 'faker';
import { IScreenSearch } from '../../core/models/screen-search';
import { EListingStatus, EPropertyStatus, IPropertyDetails, IPropertyListing } from '../../core/models/property';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EPropertyType } from 'src/app/core/enums/propertyTypes';
import { resolve } from 'dns';

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

  getPropertyListingsApi(searchCriteria: IScreenSearch, limit: number = 10, offset = 0): Promise<IPropertyListing[]> {
    let params = new HttpParams()
      .set("limit", limit.toString())
      .set("offset", offset.toString())
      .set("city", searchCriteria.location.city)
      .set("state_code", searchCriteria.location.state)

    return this.http.get<IPropertyListing[]>(environment.apiBase + "/properties/list-for-sale", { params: params })
      .toPromise();
  }

  getPropertyListings(searchCriteria: IScreenSearch, limit: number = 10, offset = 0): Promise<IPropertyListing[]> {
    // required params
    let params = new HttpParams()
      .set("limit", limit.toString())
      .set("offset", offset.toString())
      .set("city", searchCriteria.location.city)
      .set("state_code", searchCriteria.location.state)
      .set("useFaker", "true");

    // optional filters

    // for (const [key, value] of Object.entries(searchCriteria)) {
    //   params.set(key,value.toString());
    // }

    return this.http.get<IPropertyListing[]>(environment.apiBase + "/properties/list-for-sale", { params: params })
      .toPromise();
  }

  getListingDetails(propertyId: string): Promise<IPropertyDetails> {
    return this.http.get<IPropertyDetails>(environment.apiBase + `/properties/listing-details/${propertyId}`)
      .toPromise();
  }
}
