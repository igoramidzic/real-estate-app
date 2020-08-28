import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import * as faker from 'faker';
import { IScreenSearch } from '../../core/models/screen-search';
import { IPropertyDetails, IPropertyListing } from '../../core/models/property';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {

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
    return new Promise((resolve, reject) => {
      let propertyDetails: IPropertyDetails = {
        propertyId
      }

      setTimeout(() => {
        resolve(propertyDetails);

      }, 1000);
    })
  }
}
