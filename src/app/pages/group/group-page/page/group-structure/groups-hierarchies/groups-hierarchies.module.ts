import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupsHierarchiesRoutingModule} from './groups-hierarchies-routing.module';
import {GroupsHierarchiesComponent} from './groups-hierarchies/groups-hierarchies.component';
import {GroupConnectionsGraphModule} from '../../../../../../module/group/group-connections-graph/group-connections-graph.module';
import {TranslateModule} from '@ngx-translate/core';
import {InputSelectModule} from '../../../../../../components/input-select/input-select.module';

@NgModule({
  declarations: [GroupsHierarchiesComponent],
  imports: [
    CommonModule,
    GroupsHierarchiesRoutingModule,
    GroupConnectionsGraphModule,
    TranslateModule.forChild(),
    InputSelectModule
  ]
})
export class GroupsHierarchiesModule {
}
