import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupStructureComponent} from './group-structure/group-structure.component';

const routes: Routes = [
  {
    path: '', component: GroupStructureComponent,
    children: [
      {path: '', redirectTo: 'cluster', pathMatch: 'full'},
      {path: 'cluster', loadChildren: './group-clusters/group-clusters.module#GroupClustersModule'},
      {path: 'request', loadChildren: './group-requests/group-requests.module#GroupRequestsModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupStructureRoutingModule {
}
