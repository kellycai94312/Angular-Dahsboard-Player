import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupIncomingRequestsComponent} from './group-incoming-requests/group-incoming-requests.component';

const routes: Routes = [{path: '', component: GroupIncomingRequestsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupIncomingRequestsRoutingModule {
}
