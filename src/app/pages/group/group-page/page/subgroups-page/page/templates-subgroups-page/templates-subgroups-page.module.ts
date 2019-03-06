import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemplatesSubgroupsPageRoutingModule} from './templates-subgroups-page-routing.module';
import {TemplatesSubgroupsPageComponent} from './templates-subgroups-page/templates-subgroups-page.component';

@NgModule({
  declarations: [TemplatesSubgroupsPageComponent],
  imports: [
    CommonModule,
    TemplatesSubgroupsPageRoutingModule
  ]
})
export class TemplatesSubgroupsPageModule {
}
