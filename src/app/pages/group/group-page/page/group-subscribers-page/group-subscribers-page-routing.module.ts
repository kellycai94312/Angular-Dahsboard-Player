import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupSubscribersPageComponent} from './group-subscribers-page/group-subscribers-page.component';

const routes: Routes = [
  {path: '', component: GroupSubscribersPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupSubscribersPageRoutingModule {
}
