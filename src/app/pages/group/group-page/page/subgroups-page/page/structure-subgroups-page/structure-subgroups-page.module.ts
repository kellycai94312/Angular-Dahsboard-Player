import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StructureSubgroupsPageRoutingModule} from './structure-subgroups-page-routing.module';
import {StructureSubgroupsPageComponent} from './structure-subgroups-page/structure-subgroups-page.component';

@NgModule({
  declarations: [StructureSubgroupsPageComponent],
  imports: [
    CommonModule,
    StructureSubgroupsPageRoutingModule
  ]
})
export class StructureSubgroupsPageModule {
}
