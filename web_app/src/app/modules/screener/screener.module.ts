import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SCREENER_ROUTES } from './screener.routes';
import { ScreenerComponent } from './screener.component';

@NgModule({
    declarations: [
        ScreenerComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(SCREENER_ROUTES)
    ],
    exports: [
    ],
    providers: [],
    entryComponents: []
})
export class ScreenerModule { }
