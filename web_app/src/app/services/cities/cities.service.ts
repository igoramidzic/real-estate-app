import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ISearchLocation } from 'src/app/core/models/location';
import * as csv from 'csvtojson';
import { ICoordinates } from '../../core/models/coordinates';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getCitiesFromPrefix(prefix: string, limit = 5): Promise<ISearchLocation[]> {
    console.log(environment)

    let params = new HttpParams().set("prefix", prefix).set("limit", limit.toString())

    return this.http.get<ISearchLocation[]>(environment.apiBase + "/cities/cities-from-prefix", { params: params })
      .toPromise();
  }

  getCitiesById(id: string): Promise<ISearchLocation> {
    return this.http.get<ISearchLocation>(environment.apiBase + `/cities/cities-from-id/${id}`)
      .toPromise();
  }

  getSearchLocationFromCityState(cityState: string): Promise<ISearchLocation> {
    return this.http.get<ISearchLocation>(environment.apiBase + `/cities/location-from-city-state/${cityState}`)
      .toPromise();
  }

  getFullCityStateName(searchLocation: ISearchLocation): string {
    const { city, state } = searchLocation;
    return city + ", " + state;
  }

  getRandomPopularCity(): Promise<ISearchLocation> {
    return this.http.get<ISearchLocation>(environment.apiBase + "/cities/random-location")
      .toPromise();
  }

  get centerUSCoords(): ICoordinates {
    return { lat: 37.0902, lng: -95.7129 };
  }
}
