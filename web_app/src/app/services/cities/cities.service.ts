import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearchLocation } from 'src/app/core/models/location';
import * as csv from 'csvtojson';
import { ICoordinates } from '../../core/models/coordinates';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private cities_csv;
  private searchLocations: ISearchLocation[];

  constructor(private http: HttpClient) {
    this.generateSearchLocationsFromCSV();
  }

  private generateSearchLocationsFromCSV(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.cities_csv)
          this.cities_csv = await this.http.get('assets/data/uscities.csv', { responseType: 'text' }).toPromise();

        await csv().fromString(this.cities_csv)
          .then((searchLocations: ISearchLocation[]) => {
            this.searchLocations = searchLocations;
            resolve();
          })

        // Convert string lat/lng to number
        this.searchLocations.forEach(searchLocation => {
          searchLocation.lat = +searchLocation.lat;
          searchLocation.lng = +searchLocation.lng
        });

      } catch (e) {
        reject();
      }
    })
  }

  getCitiesFromPrefix(prefix: string, limit = 5): Promise<ISearchLocation[]> {
    prefix = prefix.trim().replace(/\s/g, '');
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.searchLocations)
          await this.generateSearchLocationsFromCSV();

        let optionsToReturn: ISearchLocation[];

        optionsToReturn = this.searchLocations.filter(d => {
          let fullString1 = (d.city + ", " + d.state).toLowerCase().replace(/\s/g, '');
          let fullString2 = (d.city + ", " + d.state_full_name).toLowerCase().replace(/\s/g, '');

          if (fullString1.startsWith(prefix.toLowerCase().replace(/\s/g, '')) || fullString2.startsWith(prefix.toLowerCase().replace(/\s/g, '')))
            return true;

          return false;
        })

        optionsToReturn = optionsToReturn.sort((a, b) => {
          let fullString1 = (a.city + ", " + a.state).toLowerCase().replace(/\s/g, '');
          let fullString2 = (b.city + ", " + b.state_full_name).toLowerCase().replace(/\s/g, '');
          return fullString1 > fullString2 ? 1 : -1;
        }).splice(0, limit);
        resolve(optionsToReturn);
      } catch {
        reject();
      }
    })
  }

  getCitiesById(id: string): Promise<ISearchLocation> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.searchLocations)
          await this.generateSearchLocationsFromCSV();

        let searchLocation: ISearchLocation = this.searchLocations.find(x => x.id == id);

        if (!searchLocation) reject('Location not found.');

        resolve(searchLocation);
      } catch {
        reject('Something went wrong.');
      }
    })
  }

  getSearchLocationFromCityState(cityState: string): Promise<ISearchLocation> {
    cityState = cityState.trim().replace(/\s/g, '');

    return new Promise(async (resolve, reject) => {
      try {
        if (!this.searchLocations)
          await this.generateSearchLocationsFromCSV();

        let searchLocation: ISearchLocation = this.searchLocations.find(d => {
          let fullString1 = (d.city + ", " + d.state).toLowerCase().replace(/\s/g, '');
          let fullString2 = (d.city + ", " + d.state_full_name).toLowerCase().replace(/\s/g, '');

          if (fullString1.startsWith(cityState.toLowerCase().replace(/\s/g, '')) || fullString2.startsWith(cityState.toLowerCase().replace(/\s/g, '')))
            return true;

          return false;
        })


        if (!searchLocation) reject('Location not found.');

        resolve(searchLocation);
      } catch {
        reject();
      }
    })
  }

  getFullCityStateName(searchLocation: ISearchLocation): string {
    const { city, state } = searchLocation;
    return city + ", " + state;
  }

  getRandomPopularCity(): Promise<ISearchLocation> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.searchLocations)
          await this.generateSearchLocationsFromCSV();

        resolve(this.searchLocations[Math.floor(Math.random() * this.searchLocations.length)]);
      } catch {
        reject();
      }
    })
  }

  get centerUSCoords(): ICoordinates {
    return { lat: 37.0902, lng: -95.7129 };
  }
}
