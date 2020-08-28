import { ISearchLocation } from "../api/core/models/location";

const fs = require('fs');
const path = require("path");

export class CitiesService {

    private static cityLocations: any[];

    static initialize() {
        // console.log(path.resolve(__dirname, "../../src/data/uscities.csv"));
        this.cityLocations = fs.readFileSync(path.resolve(__dirname, "../../src/data/uscities.csv"))
            .toString() // convert Buffer to string
            .split('\n') // split string to lines
            .map((line: any) => line.trim()) // remove white spaces for each line
            .map((line: any) => {

                var buffer = line.split(',');
                return {
                    city: buffer[0],
                    state: buffer[1],
                    state_full_name: buffer[2],
                    lat: +buffer[3],
                    lng: +buffer[4],
                    id: buffer[5]
                }
            }).slice(1); // split each line to array
        // console.log(this.cities_csv)
    }

    // use by faker
    static getLocationFromCityAndStateCode(city: string, stateCode: string): any {

        let locationToReturn: any;

        this.cityLocations.forEach(location => {
            if (location.city.trim() === city.trim() && location.state.trim() === stateCode.trim()) {
                locationToReturn = location;
            }
        });

        return locationToReturn;
    }

    static getCitiesFromPrefix(prefix: string, limit = 5): ISearchLocation[] {

        if (prefix === undefined || limit === undefined) {
            return [];
        }

        prefix = prefix.trim().replace(/\s/g, '');

        return this.cityLocations.filter(d => {
            let fullString1 = (d.city + "," + d.state).toLowerCase().replace(/\s/g, '');
            let fullString2 = (d.city + "," + d.state_full_name).toLowerCase().replace(/\s/g, '');
            let state1 = (d.state).toLowerCase().replace(/\s/g, '');
            let state2 = (d.state_full_name).toLowerCase().replace(/\s/g, '');

            if (fullString1.startsWith(prefix.toLowerCase().replace(/\s/g, '')) ||
                fullString2.startsWith(prefix.toLowerCase().replace(/\s/g, '')) ||
                state1.startsWith(prefix.toLowerCase().replace(/\s/g, '')) ||
                state2.startsWith(prefix.toLowerCase().replace(/\s/g, '')))
                return true;

            return false;

        }).splice(0, limit);
    }
}



