import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupOutcomingRequestsComponent} from './group-outcoming-requests/group-outcoming-requests.component';

const routes: Routes = [{path: '', component: GroupOutcomingRequestsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupOutcomingRequestsRoutingModule {
}
