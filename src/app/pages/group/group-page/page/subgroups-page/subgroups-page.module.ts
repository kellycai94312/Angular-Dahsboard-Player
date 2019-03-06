import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubgroupsPageRoutingModule} from './subgroups-page-routing.module';
import {SubgroupsPageComponent} from './subgroups-page/subgroups-page.component';
import {NgxTabModule} from '../../../../../components/ngx-tab/ngx-tab.module';
import {EditSubgroupTemplateModule} from '../../../../../module/group/edit-subgroup-template/edit-subgroup-template.module';

@NgModule({
  declarations: [SubgroupsPageComponent],
  imports: [
    CommonModule,
    SubgroupsPageRoutingModule,
    NgxTabModule,
    EditSubgroupTemplateModule
  ]
})
export class SubgroupsPageModule {
}