import {EPropertyType} from '../enums/propertyTypes';
import {ISearchLocation} from './location';

export interface IProperty {
    propertyId: number;
    listingId: number;
    price: number
    propertyType: EPropertyType;
    location: ISearchLocation;
}