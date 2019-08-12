import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureSubgroupsPageRoutingModule} from './structure-subgroups-page-routing.module';
import {StructureSubgroupsPageComponent} from './structure-subgroups-page/structure-subgroups-page.component';
import {SubgroupsTreesModule} from '../../../../../../../module/group/subgroups-trees/subgroups-trees.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxSplitButtonModule} from '../../../../../../../components/ngx-split-button/ngx-split-button.module';
import {SubgroupReportModule} from '../../../../../../../module/group/subgroup-report/subgroup-report.module';
import {SubgroupPersonListModule} from '../../../../../../../module/group/subgroup-person-list/subgroup-person-list.module';

@NgModule({
  declarations: [StructureSubgroupsPageComponent],
  imports: [
    CommonModule,
    StructureSubgroupsPageRoutingModule,
    SubgroupsTreesModule,
    FlexLayoutModule,
    NgxSplitButtonModule,
    SubgroupReportModule,
    SubgroupPersonListModule
  ]
})
export class StructureSubgroupsPageModule {
}
