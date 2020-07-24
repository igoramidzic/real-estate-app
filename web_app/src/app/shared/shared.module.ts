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

@NgModule({
    imports: [
        CommonModule,
        Ng5SliderModule,
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
    ],
    exports: [
        CommonModule,
        QuizQuestionChooserComponent,
        QuizNavigationButtonsComponent,
        ProgressBarComponent,
        QuizProgressComponent,
        QuizQuestionSaleTypeComponent,
        QuizOptionItemComponent,
        QuizQuestionPropertyTypeComponent,
        QuizQuestionBedroomsComponent,
        Ng5SliderModule
    ]
})
export class SharedModule { }
