import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path: 'details/:id', component: DetailsComponent },
  { path: 'list', component: ListComponent },
  // Otherwise routes
  { path: '', pathMatch: 'full', redirectTo: '/list' },
  { path: '**', pathMatch: 'full', redirectTo: '/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
