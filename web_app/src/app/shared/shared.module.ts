import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';

import { QuizQuestionChooserComponent } from './components/quiz/quiz-question-chooser/quiz-question-chooser.component';
import { QuizNavigationButtonsComponent } from './components/quiz/quiz-navigation-buttons/quiz-navigation-buttons.component';
import { ProgressBarComponent } from './components/loaders/progress-bar/progress-bar.component';
import { QuizProgressComponent } from './components/quiz/quiz-progress/quiz-progress.component';
import { QuizQuestionSaleTypeComponent } from './components/quiz/quiz-questions/quiz-question-sale-type/quiz-question-sale-type.component';
import { QuizOptionItemComponent } from './components/quiz/quiz-option-item/quiz-option-item.component';
import { QuizQuestionPropertyTypeComponent } from './components/quiz/quiz-questions/quiz-question-property-type/quiz-question-property-type.component';
import { QuizQuestionBedroomsComponent } from './components/quiz/quiz-questions/quiz-question-bedrooms/quiz-question-bedrooms.component';
import { QuizQuestionPriceComponent } from './components/quiz/quiz-questions/quiz-question-price/quiz-question-price.component';
import { QuizQuestionLocationComponent } from './components/quiz/quiz-questions/quiz-question-location/quiz-question-location.component';
import { FormsModule } from '@angular/forms';
import { QuizQuestionAmenitiesComponent } from './components/quiz/quiz-questions/quiz-question-amenities/quiz-question-amenities.component';
import { QuizCompletedMessageComponent } from './components/quiz/quiz-completed-message/quiz-completed-message.component';
import { MainNavbarComponent } from './components/navbars/main-navbar/main-navbar.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { QuizNavbarComponent } from './components/navbars/quiz-navbar/quiz-navbar.component';
import { PropertyThumbnailPlaceholderComponent } from './components/properties/property-thumbnail-placeholder/property-thumbnail-placeholder.component';
import { PropertyThumbnailComponent } from './components/properties/property-thumbnail/property-thumbnail.component';
import { SpinnerComponent } from './components/loaders/spinner/spinner.component';
import { SortByFormComponent } from './components/forms/sort-by-form/sort-by-form.component';
import { MarkerInfoCardComponent } from './components/map/marker-info-card/marker-info-card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Ng5SliderModule,
        GoogleMapsModule,
        RouterModule,
    ],
    declarations: [
        QuizQuestionChooserComponent,
        QuizNavigationButtonsComponent,
        ProgressBarComponent,
        QuizProgressComponent,
        QuizQuestionSaleTypeComponent,
        QuizOptionItemComponent,
        QuizQuestionPropertyTypeComponent,
        QuizQuestionBedroomsComponent,
        QuizQuestionPriceComponent,
        QuizQuestionLocationComponent,
        QuizQuestionAmenitiesComponent,
        QuizCompletedMessageComponent,
        MainNavbarComponent,
        QuizNavbarComponent,
        PropertyThumbnailPlaceholderComponent,
        PropertyThumbnailComponent,
        SpinnerComponent,
        SortByFormComponent,
        MarkerInfoCardComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        QuizQuestionChooserComponent,
        QuizNavigationButtonsComponent,
        ProgressBarComponent,
        QuizProgressComponent,
        QuizQuestionSaleTypeComponent,
        QuizOptionItemComponent,
        QuizQuestionPropertyTypeComponent,
        QuizQuestionBedroomsComponent,
        Ng5SliderModule,
        QuizQuestionLocationComponent,
        QuizQuestionAmenitiesComponent,
        QuizCompletedMessageComponent,
        MainNavbarComponent,
        GoogleMapsModule,
        QuizNavbarComponent,
        PropertyThumbnailPlaceholderComponent,
        PropertyThumbnailComponent,
        SpinnerComponent,
        SortByFormComponent,
        MarkerInfoCardComponent
    ],
})
export class SharedModule { }
