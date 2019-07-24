import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupStructureComponent} from './group-structure/group-structure.component';

const routes: Routes = [
  {
    path: '', component: GroupStructureComponent,
    children: [
      {path: '', redirectTo: 'cluster', pathMatch: 'full'},
      {path: 'cluster', loadChildren: './group-clusters/group-clusters.module#GroupClustersModule'},
      {path: 'hierarchy', loadChildren: './groups-hierarchies/groups-hierarchies.module#GroupsHierarchiesModule'},
      {path: 'request', loadChildren: './group-requests/group-requests.module#GroupRequestsModule'},
      {path: 'report', loadChildren: './group-reports/group-reports.module#GroupReportsModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupStructureRoutingModule {
}
