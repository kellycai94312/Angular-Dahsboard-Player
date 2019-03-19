import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureSubgroupsPageRoutingModule} from './structure-subgroups-page-routing.module';
import {StructureSubgroupsPageComponent} from './structure-subgroups-page/structure-subgroups-page.component';
import {SubgroupsTreesModule} from '../../../../../../../module/group/subgroups-trees/subgroups-trees.module';

@NgModule({
  declarations: [StructureSubgroupsPageComponent],
  imports: [
    CommonModule,
    StructureSubgroupsPageRoutingModule,
    SubgroupsTreesModule
  ]
})
export class StructureSubgroupsPageModule {
}
