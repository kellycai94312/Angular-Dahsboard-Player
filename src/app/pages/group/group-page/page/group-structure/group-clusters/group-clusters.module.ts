import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupClustersRoutingModule} from './group-clusters-routing.module';
import {GroupClustersComponent} from './group-clusters/group-clusters.component';

@NgModule({
  declarations: [GroupClustersComponent],
  imports: [
    CommonModule,
    GroupClustersRoutingModule
  ]
})
export class GroupClustersModule {
}
