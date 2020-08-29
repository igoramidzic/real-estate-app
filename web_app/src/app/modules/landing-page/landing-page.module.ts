import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { LANDING_PAGE_ROUTES } from './landing-page.routes';
import { LandingPageComponent } from './landing-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        LandingPageComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(LANDING_PAGE_ROUTES)
    ],
    exports: [
    ],
    providers: [],
    entryComponents: []
})
export class LandingPageModule { }
