import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearchLocation } from 'src/app/core/models/location';
import * as csv from 'csvtojson';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private cities_csv;

  constructor(private http: HttpClient) { }

  getCitiesFromPrefix(prefix: string): Promise<ISearchLocation[]> {
    prefix = prefix.trim().replace(/\s/g, '');
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.cities_csv)
          this.cities_csv = await this.http.get('assets/data/uscities.csv', { responseType: 'text' }).toPromise();

        let optionsToReturn: ISearchLocation[];

        await csv().fromString(this.cities_csv)
          .then((data: ISearchLocation[]) => {
            optionsToReturn = data.filter(d => {
              let fullString1 = (d.city + ", " + d.state).toLowerCase().replace(/\s/g, '');
              let fullString2 = (d.city + ", " + d.state_full_name).toLowerCase().replace(/\s/g, '');

              if (fullString1.startsWith(prefix.toLowerCase().replace(/\s/g, '')) || fullString2.startsWith(prefix.toLowerCase().replace(/\s/g, '')))
                return true;

              return false;
            })
          })

        optionsToReturn.sort((a, b) => a.city > b.city ? 1 : -1);
        resolve(optionsToReturn);
      } catch {
        reject();
      }
    })
  }

  getSearchLocationFromCityState(cityState: string): Promise<ISearchLocation> {
    cityState = cityState.trim().replace(/\s/g, '');
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.cities_csv)
          this.cities_csv = await this.http.get('assets/data/uscities.csv', { responseType: 'text' }).toPromise();

        let possibleLocations: ISearchLocation[];

        await csv().fromString(this.cities_csv)
          .then((data: ISearchLocation[]) => {
            possibleLocations = data.filter(d => {
              let fullString1 = (d.city + ", " + d.state).toLowerCase().replace(/\s/g, '');
              let fullString2 = (d.city + ", " + d.state_full_name).toLowerCase().replace(/\s/g, '');

              if (fullString1.startsWith(cityState.toLowerCase().replace(/\s/g, '')) || fullString2.startsWith(cityState.toLowerCase().replace(/\s/g, '')))
                return true;

              return false;
            })
          })

        console.log(possibleLocations)
        if (possibleLocations.length == 0) return reject('Could not find this city.');

        resolve(possibleLocations[0]);
      } catch {
        reject();
      }
    })
  }
}
