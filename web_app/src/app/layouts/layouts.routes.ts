import { Routes } from '@angular/router';
import { NotFoundLayoutComponent } from './not-found-layout/not-found-layout.component';
import { NotFoundComponent } from '../modules/not-found/not-found.component';
import { QuizLayoutComponent } from './quiz-layout/quiz-layout.component';

export const LAYOUTS_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'quiz',
        pathMatch: 'full'
    },
    {
        path: 'quiz',
        component: QuizLayoutComponent,
        loadChildren: () => import('../modules/quiz/quiz.module').then(m => m.QuizModule)
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
