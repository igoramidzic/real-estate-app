const fs = require('fs');
const path = require("path");

export class CitiesService {

    private static cities_csv: any[];

    static initialize() {
        // console.log(path.resolve(__dirname, "../../src/data/uscities.csv"));
        this.cities_csv = fs.readFileSync(path.resolve(__dirname, "../../src/data/uscities.csv"))
            .toString() // convert Buffer to string
            .split('\n') // split string to lines
            // .shift()
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

    static getLocationFromCityAndStateCode(city: string, stateCode: string): any {

        let locationToReturn: any;

        this.cities_csv.forEach(location => {
            if (location.city.trim() === city.trim() && location.state.trim() === stateCode.trim()) {
                locationToReturn = location;
            }
        });

        return locationToReturn;
    }
}



