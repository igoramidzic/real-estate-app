import {EPropertyType} from '../enums/propertyTypes';
import { IAddress } from './address';

export interface IProperty {
    propertyId: number;
    listingId: number;
    price: number
    propertyType: EPropertyType;
    address: IAddress;
}