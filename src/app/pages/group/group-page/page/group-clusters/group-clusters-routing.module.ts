import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupClustersComponent} from './group-clusters/group-clusters.component';

const routes: Routes = [{path: '', component: GroupClustersComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupClustersRoutingModule {
}
