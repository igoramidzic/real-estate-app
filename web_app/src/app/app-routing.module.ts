import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ALL_ROUTES } from './shared/routes/routes';
import { NotFoundLayoutComponent } from './shared/layouts/not-found-layout/not-found-layout.component';


const routes: Routes = [
  {
    path: '**',
    component: NotFoundLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
