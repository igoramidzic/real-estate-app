import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearchLocation } from 'src/app/core/models/location';
import * as csv from 'csvtojson';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getCitiesFromPrefix(prefix: string): Promise<ISearchLocation[]> {
    prefix = prefix.trim();
    return new Promise(async (resolve, reject) => {
      try {
        let csvData = await this.http.get('assets/data/uscities.csv', { responseType: 'text' }).toPromise();

        let optionsToReturn: ISearchLocation[];

        await csv().fromString(csvData)
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
