import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupRequestsComponent} from './group-requests/group-requests.component';

const routes: Routes = [{
  path: '', component: GroupRequestsComponent,
  children: [
    {path: '', redirectTo: 'outcoming', pathMatch: 'full'},
    {path: 'outcoming', loadChildren: './group-outcoming-requests/group-outcoming-requests.module#GroupOutcomingRequestsModule'},
    {path: 'incoming', loadChildren: './group-incoming-requests/group-incoming-requests.module#GroupIncomingRequestsModule'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRequestsRoutingModule {
}
