import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupRequestsRoutingModule} from './group-requests-routing.module';
import {GroupRequestsComponent} from './group-requests/group-requests.component';
import {NgxButtonModule} from '../../../../../../components/ngx-button/ngx-button.module';
import {EditGroupConnectionRequestModule} from '../../../../../../module/group/edit-group-connection-request/edit-group-connection-request.module';
import {NgxTabsModule} from '../../../../../../module/ngx/ngx-tabs/ngx-tabs.module';

@NgModule({
  declarations: [GroupRequestsComponent],
  imports: [
    CommonModule,
    GroupRequestsRoutingModule,
    NgxTabsModule,
    NgxButtonModule,
    EditGroupConnectionRequestModule
  ]
})
export class GroupRequestsModule {
}
