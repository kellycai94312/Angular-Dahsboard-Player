import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupClustersRoutingModule} from './group-clusters-routing.module';
import {GroupClustersComponent} from './group-clusters/group-clusters.component';
import {NgxGridModule} from '../../../../../components/ngx-grid/ngx-grid.module';

@NgModule({
  declarations: [GroupClustersComponent],
  imports: [
    CommonModule,
    GroupClustersRoutingModule,
    NgxGridModule
  ]
})
export class GroupClustersModule {
}
