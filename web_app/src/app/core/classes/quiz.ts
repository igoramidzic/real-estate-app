import { EQuizQuestions } from '../enums/quizQuestions';
import { ESaleType as ESaleType } from '../enums/saleTypes';
import { EPropertyType } from '../enums/propertyTypes';
import { EBedroomCount } from '../enums/bedroomCount';
import { ILocation } from '../models/location';
import { EAmenitiesRent, EAmenitiesSale } from '../enums/amenities';

export class Quiz {
    private _currentQuestion: EQuizQuestions;
    private _questionsCompleted: number;
    private _questionCount: number;
    private _saleType: ESaleType;
    private _propertyTypes: EPropertyType[];
    private _bedroomCounts: EBedroomCount[];
    private _priceMin: number;
    private _priceMax: number;
    private _location: ILocation;
    private _amenities: (EAmenitiesRent | EAmenitiesSale)[];

    get currentQuestion(): EQuizQuestions { return this._currentQuestion }
    get questionCount(): number { return this._questionCount }
    get saleType(): ESaleType { return this._saleType }
    get propertyTypes(): EPropertyType[] { return this._propertyTypes }
    get bedroomCounts(): EBedroomCount[] { return this._bedroomCounts }
    get priceMin(): number { return this._priceMin }
    get priceMax(): number { return this._priceMax }
    get location(): ILocation { return this._location }
    get amenities(): (EAmenitiesRent | EAmenitiesSale)[] { return this._amenities }

    constructor() {
        this._currentQuestion = EQuizQuestions.SaleType;
        this._questionCount = 6;
        this._questionsCompleted = 0;
        this._propertyTypes = [];
        this._bedroomCounts = [];
    }

    updateSaleType(saleType: ESaleType): void {
        this._saleType = saleType;
    }

    updatePropertyTypes(propertyTypes: EPropertyType[]): void {
        this._propertyTypes = propertyTypes;
        if (this._propertyTypes == null) this._propertyTypes = [];
    }

    updateBedroomCounts(bedroomCounts: EBedroomCount[]): void {
        this._bedroomCounts = bedroomCounts;
        if (this._propertyTypes == null) this._propertyTypes = [];
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
                return this.saleTypeIsValid() ? true : false;
            case EQuizQuestions.PropertyTypes:
                return this.propertyTypesIsValid() ? true : false;
            case EQuizQuestions.Bedrooms:
                return this.bedroomCountsIsValid() ? true : false;
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

    get percentageCompleted(): number {
        return Math.ceil(((this._questionsCompleted) / this.questionCount) * 100);
    }

    get completed(): boolean {
        return this._questionsCompleted == this.questionCount;
    }
}