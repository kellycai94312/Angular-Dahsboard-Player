import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureSubgroupsPageRoutingModule} from './structure-subgroups-page-routing.module';
import {StructureSubgroupsPageComponent} from './structure-subgroups-page/structure-subgroups-page.component';
import {SubgroupsTreesModule} from '../../../../../../../module/group/subgroups-trees/subgroups-trees.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxGridModule} from '../../../../../../../components/ngx-grid/ngx-grid.module';
import {OldEditPersonModule} from '../../../../../../../module/person/old-edit-person/old-edit-person.module';
import {NgxModalModule} from '../../../../../../../components/ngx-modal/ngx-modal.module';
import {NgxSplitButtonModule} from '../../../../../../../components/ngx-split-button/ngx-split-button.module';

@NgModule({
  declarations: [StructureSubgroupsPageComponent],
  imports: [
    CommonModule,
    StructureSubgroupsPageRoutingModule,
    SubgroupsTreesModule,
    FlexLayoutModule,
    NgxGridModule,
    OldEditPersonModule,
    NgxModalModule,
    NgxSplitButtonModule
  ]
})
export class StructureSubgroupsPageModule {
}
