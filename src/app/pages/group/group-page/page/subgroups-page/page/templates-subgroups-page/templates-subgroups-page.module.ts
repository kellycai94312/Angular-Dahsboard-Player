import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TemplatesSubgroupsPageRoutingModule} from './templates-subgroups-page-routing.module';
import {TemplatesSubgroupsPageComponent} from './templates-subgroups-page/templates-subgroups-page.component';
import {SubgroupsTreesModule} from '../../../../../../../module/group/subgroups-trees/subgroups-trees.module';
import {SubgroupModalService} from '../../service/subgroup-modal.service';
import {EditSubgroupTemplateModule} from '../../../../../../../module/group/edit-subgroup-template/edit-subgroup-template.module';
import {EditSubgroupModule} from '../../../../../../../module/group/edit-subgroup/edit-subgroup.module';
import {ApplyingSubgroupTemplateModule} from '../../../../../../../module/group/applying-subgroup-template/applying-subgroup-template.module';

@NgModule({
  declarations: [TemplatesSubgroupsPageComponent],
  providers: [SubgroupModalService],
  imports: [
    CommonModule,
    TemplatesSubgroupsPageRoutingModule,
    SubgroupsTreesModule,
    EditSubgroupTemplateModule,
    EditSubgroupModule,
    ApplyingSubgroupTemplateModule
  ]
})
export class TemplatesSubgroupsPageModule {
}
