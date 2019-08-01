import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonNewsComponent} from './person-news/person-news.component';

const routes: Routes = [{path: '', component: PersonNewsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonNewsRoutingModule {
}
