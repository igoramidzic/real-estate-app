import { EPropertyTypes } from '../enums/propertyTypes';
import { EBedroomCount } from '../enums/bedroomCount';
import { EAmenitiesRent } from '../enums/amenities';

export interface ISearchOptions {
    propertyType: EPropertyTypes[];
    bedroomCount: EBedroomCount[];
    priceMin: number;
    priceMax: number;
    location: {},
    amenities: EAmenitiesRent[];
}