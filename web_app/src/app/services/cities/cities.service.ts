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
    prefix = prefix.trim();
    return new Promise(async (resolve, reject) => {
      try {
        if (!this.cities_csv)
          this.cities_csv = await this.http.get('assets/data/uscities.csv', { responseType: 'text' }).toPromise();

        let optionsToReturn: ISearchLocation[];

        await csv().fromString(this.cities_csv)
          .then((data: ISearchLocation[]) => {
            optionsToReturn = data.filter(d => {
              let fullString1 = (d.city + ", " + d.state).toLowerCase();
              let fullString2 = (d.city + ", " + d.state_full_name).toLowerCase();

              if (fullString1.startsWith(prefix.toLowerCase()) || fullString2.startsWith(prefix.toLowerCase()))
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
}
