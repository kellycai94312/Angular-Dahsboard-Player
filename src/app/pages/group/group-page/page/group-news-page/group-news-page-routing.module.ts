import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupNewsPageComponent} from './group-news-page/group-news-page.component';

const routes: Routes = [
  {path: '', component: GroupNewsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupNewsPageRoutingModule {
}
