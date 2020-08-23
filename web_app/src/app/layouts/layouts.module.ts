import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NotFoundLayoutComponent } from './not-found-layout/not-found-layout.component';
import { LAYOUTS_ROUTES } from './layouts.routes';
import { QuizLayoutComponent } from './quiz-layout/quiz-layout.component';
import { ScreenerLayoutComponent } from './screener-layout/screener-layout.component';

@NgModule({
    declarations: [
        NotFoundLayoutComponent,
        QuizLayoutComponent,
        ScreenerLayoutComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(LAYOUTS_ROUTES)
    ],
    exports: [
    ],
    providers: [],
})
export class LayoutsModule { }
