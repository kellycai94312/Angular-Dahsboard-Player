import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureSubgroupsPageRoutingModule} from './structure-subgroups-page-routing.module';
import {StructureSubgroupsPageComponent} from './structure-subgroups-page/structure-subgroups-page.component';
import {SubgroupsTreesModule} from '../../../../../../../module/group/subgroups-trees/subgroups-trees.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxGridModule} from '../../../../../../../components/ngx-grid/ngx-grid.module';
import {NgxModalModule} from '../../../../../../../components/ngx-modal/ngx-modal.module';
import {NgxSplitButtonModule} from '../../../../../../../components/ngx-split-button/ngx-split-button.module';
import {SubgroupReportModule} from '../../../../../../../module/group/subgroup-report/subgroup-report.module';

@NgModule({
  declarations: [StructureSubgroupsPageComponent],
  imports: [
    CommonModule,
    StructureSubgroupsPageRoutingModule,
    SubgroupsTreesModule,
    FlexLayoutModule,
    NgxGridModule,
    NgxModalModule,
    NgxSplitButtonModule,
    SubgroupReportModule
  ]
})
export class StructureSubgroupsPageModule {
}
