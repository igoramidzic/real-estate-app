import { Routes } from '@angular/router';
import { NotFoundLayoutComponent } from '../layouts/not-found-layout/not-found-layout.component';

export const ALL_ROUTES: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'dashboard',
    //     pathMatch: 'full'
    // },
    {
        path: '/',
        component: NotFoundLayoutComponent,
        // loadChildren: () => import('../../modules/not-found/not-found.module').then(m => m.NotFoundModule)
    }
];
