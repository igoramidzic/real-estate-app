import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';
import { NOTFOUND_ROUTES } from './not-found.routes';

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(NOTFOUND_ROUTES)
    ],
})
export class NotFoundModule { }
