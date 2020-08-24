import { HttpClient } from '@angular/common/http';
import {ScreenSearch} from '../../core/models/screen-search';
import {IProperty} from '../../core/models/property';

export class RealtorApiService {
    
    constructor(private http: HttpClient) {}

    getForRentListings(searchQuery: ScreenSearch) : Promise<IProperty[]>{

        return new Promise(async (resolve, reject) => {

        });
    }
}
