import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgroupsPageRoutingModule} from './subgroups-page-routing.module';
import {SubgroupsPageComponent} from './subgroups-page/subgroups-page.component';
import {EditSubgroupTemplateModule} from '../../../../../module/group/edit-subgroup-template/edit-subgroup-template.module';
import {SubgroupModalService} from './service/subgroup-modal.service';
import {SubgroupService} from './service/subgroup.service';
import {EditSubgroupGroupModule} from '../../../../../module/group/edit-subgroup-group/edit-subgroup-group.module';
import {NgxTabsModule} from '../../../../../module/ngx/ngx-tabs/ngx-tabs.module';

@NgModule({
  declarations: [SubgroupsPageComponent],
  providers: [
    SubgroupService,
    SubgroupModalService
  ],
  imports: [
    CommonModule,
    SubgroupsPageRoutingModule,
    NgxTabsModule,
    EditSubgroupTemplateModule,
    EditSubgroupGroupModule
  ]
})
export class SubgroupsPageModule {
}
