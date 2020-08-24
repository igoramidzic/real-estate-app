import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SCREENER_ROUTES } from './screener.routes';
import { ScreenerComponent } from './screener.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { ScreenerFilterComponent } from './screener-filter/screener-filter.component';
import { ScreenerPropertyListingsComponent } from './screener-property-listings/screener-property-listings.component';

@NgModule({
    declarations: [
        ScreenerComponent,
        ScreenerFilterComponent,
        ScreenerPropertyListingsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(SCREENER_ROUTES),
        AgmCoreModule.forRoot({
            apiKey: environment.google_api_key
        })
    ],
    exports: [
    ],
    providers: [],
    entryComponents: []
})
export class ScreenerModule { }
