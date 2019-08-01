import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupNewsComponent} from './group-news/group-news.component';

const routes: Routes = [{path: '', component: GroupNewsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupNewsRoutingModule {
}
