import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupRequestsRoutingModule} from './group-requests-routing.module';
import {GroupRequestsComponent} from './group-requests/group-requests.component';
import {NgxTabModule} from '../../../../../../components/ngx-tab/ngx-tab.module';
import {NgxButtonModule} from '../../../../../../components/ngx-button/ngx-button.module';
import {EditGroupConnectionRequestModule} from '../../../../../../module/group/edit-group-connection-request/edit-group-connection-request.module';

@NgModule({
  declarations: [GroupRequestsComponent],
  imports: [
    CommonModule,
    GroupRequestsRoutingModule,
    NgxTabModule,
    NgxButtonModule,
    EditGroupConnectionRequestModule
  ]
})
export class GroupRequestsModule {
}
