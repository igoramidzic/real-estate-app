import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { QUIZ_ROUTES } from './quiz.routes';
import { QuizComponent } from './quiz.component';

@NgModule({
    declarations: [
        QuizComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(QUIZ_ROUTES)
    ],
    exports: [
    ],
    providers: [],
    entryComponents: []
})
export class QuizModule { }
