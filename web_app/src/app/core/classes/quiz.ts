import { EQuizQuestions } from '../enums/quizQuestions';
import { ESaleType as ESaleType } from '../enums/saleTypes';
import { EPropertyType } from '../enums/propertyTypes';
import { EBedroomCount } from '../enums/bedroomCount';
import { ISearchLocation } from '../models/location';
import { EAmenities } from '../enums/amenities';

export class Quiz {
    private _currentQuestion: EQuizQuestions;
    private _questionsCompleted: number;
    private _questionCount: number;
    private _saleType: ESaleType;
    private _propertyTypes: EPropertyType[];
    private _bedroomCounts: EBedroomCount[];
    private _priceMin: number;
    private _priceMax: number;
    private _location: ISearchLocation;
    private _amenities: EAmenities[];

    get currentQuestion(): EQuizQuestions { return this._currentQuestion }
    get questionCount(): number { return this._questionCount }
    get saleType(): ESaleType { return this._saleType }
    get propertyTypes(): EPropertyType[] { return this._propertyTypes }
    get bedroomCounts(): EBedroomCount[] { return this._bedroomCounts }
    get priceMin(): number { return this._priceMin }
    get priceMax(): number { return this._priceMax }
    get location(): ISearchLocation { return this._location }
    get amenities(): readonly EAmenities[] { return Object.freeze(JSON.parse(JSON.stringify(this._amenities))) }

    constructor() {
        this._currentQuestion = EQuizQuestions.SaleType;
        this._questionCount = 6;
        this._questionsCompleted = 0;
        this._propertyTypes = [];
        this._bedroomCounts = [];
        this._amenities = [];
    }

    updateSaleType(saleType: ESaleType): void {
        this._saleType = saleType;

        this.removeUnavilablePropertyTypes();
    }

    updatePropertyTypes(propertyTypes: EPropertyType[]): void {
        this._propertyTypes = propertyTypes;
        if (this._propertyTypes == null) this._propertyTypes = [];
    }

    updateBedroomCounts(bedroomCounts: EBedroomCount[]): void {
        this._bedroomCounts = bedroomCounts;
        if (this._propertyTypes == null) this._propertyTypes = [];
    }

    updatePriceMin(price: number): void {
        if (price >= this.availablePriceMin && price <= this.availablePriceMax)
            this._priceMin = price;
    }

    updatePriceMax(price: number): void {
        if (price >= this.availablePriceMin && price <= this.availablePriceMax)
            this._priceMax = price;
    }

    updateLocation(location: ISearchLocation): void {
        this._location = location;
    }

    updateAmenity(amenity: EAmenities): void {
        let amenityIndexInQuiz: number = this._amenities.findIndex(q => q == amenity);
        let amenityExists: boolean = amenityIndexInQuiz >= 0;

        if (!amenityExists) {
            this._amenities.push(amenity);
        }
        else
            this._amenities.splice(amenityIndexInQuiz, 1);
    }

    next(): void {
        if (!this.canGoNext || this.completed) return;
        this._questionsCompleted++;

        if (this.currentQuestion < this.questionCount)
            this._currentQuestion++;
    }

    back(): void {
        if (this.currentQuestion == 1) return;
        if (this.completed) this._questionsCompleted--;
        this._currentQuestion--;
        this._questionsCompleted--;
    }

    get canGoNext(): boolean {
        switch (this.currentQuestion) {
            case EQuizQuestions.SaleType:
                return this.saleTypeIsValid();
            case EQuizQuestions.PropertyTypes:
                return this.propertyTypesIsValid();
            case EQuizQuestions.Bedrooms:
                return this.bedroomCountsIsValid();
            case EQuizQuestions.Price:
                return this.priceIsValid();
            case EQuizQuestions.Location:
                return this.locationIsValid();
            case EQuizQuestions.Amenities:
                return this.amenitiesIsValid();
            default:
                true;
        }
    }

    private saleTypeIsValid(): boolean {
        return !!this.saleType;
    }

    private propertyTypesIsValid(): boolean {
        return this._propertyTypes && this._propertyTypes.length > 0;
    }

    private bedroomCountsIsValid(): boolean {
        return this._bedroomCounts && this._bedroomCounts.length > 0;
    }

    private locationIsValid(): boolean {
        return !!this._location;
    }

    private amenitiesIsValid(): boolean {
        return true;
    }

    priceIsValid(): boolean {
        return (this._priceMin >= this.availablePriceMin && this._priceMin <= this.availablePriceMax)
            && (this._priceMax >= this.availablePriceMin && this._priceMax <= this.availablePriceMax)
    }

    resetPrices(): void {
        this._priceMin = this.availablePriceMin;
        this._priceMax = this.availablePriceMax;
    }

    get percentageCompleted(): number {
        return Math.ceil(((this._questionsCompleted) / this.questionCount) * 100);
    }

    get completed(): boolean {
        return this._questionsCompleted == this.questionCount;
    }

    get availablePriceMin(): number {
        switch (this.saleType) {
            case ESaleType.Buy:
                return 0;
            case ESaleType.Rent:
                return 0;
            default:
                return 0;
        }
    }

    get availablePriceMax(): number {
        switch (this.saleType) {
            case ESaleType.Buy:
                return 900000;
            case ESaleType.Rent:
                return 10000;
            default:
                return 900000;
        }
    }

    get availablePropertyTypes(): EPropertyType[] {
        let propertyTypes: EPropertyType[] = [
            EPropertyType.Condo,
            EPropertyType.House
        ];
        if (this.saleType == ESaleType.Rent)
            propertyTypes.push(EPropertyType.Apartment);

        return propertyTypes;
    }

    private removeUnavilablePropertyTypes(): void {
        let propertyTypes: EPropertyType[] = [];
        this._propertyTypes.forEach(propertyType => {
            if (this.availablePropertyTypes.find(t => t == propertyType))
                propertyTypes.push(propertyType);
        })

        this._propertyTypes = propertyTypes;
    }
}