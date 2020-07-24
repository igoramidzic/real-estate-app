import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
    ],
    providers: [],
    entryComponents: []
})
export class NotFoundModule { }
