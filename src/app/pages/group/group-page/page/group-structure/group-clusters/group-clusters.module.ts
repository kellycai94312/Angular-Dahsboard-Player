import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupClustersRoutingModule} from './group-clusters-routing.module';
import {GroupClustersComponent} from './group-clusters/group-clusters.component';
import {MatButtonModule, MatChipsModule, MatExpansionModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GroupConnectionsGraphModule} from '../../../../../../module/group/group-connections-graph/group-connections-graph.module';

@NgModule({
  declarations: [GroupClustersComponent],
  imports: [
    CommonModule,
    GroupClustersRoutingModule,
    MatExpansionModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    GroupConnectionsGraphModule
  ]
})
export class GroupClustersModule {
}
