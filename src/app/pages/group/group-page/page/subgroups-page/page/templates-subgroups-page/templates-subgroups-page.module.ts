import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesSubgroupsPageRoutingModule} from './templates-subgroups-page-routing.module';
import {TemplatesSubgroupsPageComponent} from './templates-subgroups-page/templates-subgroups-page.component';
import {SubgroupsTreesModule} from '../../../../../../../module/group/subgroups-trees/subgroups-trees.module';
import {SubgroupModalService} from '../../service/subgroup-modal.service';
import {EditSubgroupTemplateModule} from '../../../../../../../module/group/edit-subgroup-template/edit-subgroup-template.module';
import {EditSubgroupModule} from '../../../../../../../module/group/edit-subgroup/edit-subgroup.module';
import {SubgroupTemplateGraphModule} from '../../../../../../../module/group/subgroup-template-graph/subgroup-template-graph.module';

@NgModule({
  declarations: [TemplatesSubgroupsPageComponent],
  providers: [SubgroupModalService],
  imports: [
    CommonModule,
    TemplatesSubgroupsPageRoutingModule,
    SubgroupsTreesModule,
    EditSubgroupTemplateModule,
    EditSubgroupModule,
    SubgroupTemplateGraphModule
  ]
})
export class TemplatesSubgroupsPageModule {
}
