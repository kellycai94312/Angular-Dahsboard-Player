import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubgroupsPageRoutingModule} from './subgroups-page-routing.module';
import {SubgroupsPageComponent} from './subgroups-page/subgroups-page.component';
import {NgxTabModule} from '../../../../../components/ngx-tab/ngx-tab.module';

@NgModule({
  declarations: [SubgroupsPageComponent],
  imports: [
    CommonModule,
    SubgroupsPageRoutingModule,
    NgxTabModule
  ]
})
export class SubgroupsPageModule {
}
