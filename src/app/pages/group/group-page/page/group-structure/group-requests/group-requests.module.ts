import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupRequestsRoutingModule} from './group-requests-routing.module';
import {GroupRequestsComponent} from './group-requests/group-requests.component';
import {NgxTabModule} from '../../../../../../components/ngx-tab/ngx-tab.module';

@NgModule({
  declarations: [GroupRequestsComponent],
  imports: [
    CommonModule,
    GroupRequestsRoutingModule,
    NgxTabModule
  ]
})
export class GroupRequestsModule {
}
