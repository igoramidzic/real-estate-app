import { Routes } from '@angular/router';
import { NotFoundLayoutComponent } from './not-found-layout/not-found-layout.component';
import { NotFoundComponent } from '../modules/not-found/not-found.component';
import { QuizLayoutComponent } from './quiz-layout/quiz-layout.component';
import { ScreenerLayoutComponent } from './screener-layout/screener-layout.component';

export const LAYOUTS_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'screener',
        pathMatch: 'full'
    },
    {
        path: 'quiz',
        component: QuizLayoutComponent,
        loadChildren: () => import('../modules/quiz/quiz.module').then(m => m.QuizModule)
    },
    {
        path: 'screener',
        component: ScreenerLayoutComponent,
        loadChildren: () => import('../modules/screener/screener.module').then(m => m.ScreenerModule)
    },
    {
        path: '**',
        component: NotFoundLayoutComponent,
        children: [
            {
                path: '',
                component: NotFoundComponent
            }
        ]
    }
];
