import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupOutcomingRequestsRoutingModule} from './group-outcoming-requests-routing.module';
import {GroupOutcomingRequestsComponent} from './group-outcoming-requests/group-outcoming-requests.component';
import {NgxGridModule} from '../../../../../../../components/ngx-grid/ngx-grid.module';
import {TranslateModule} from '@ngx-translate/core';
import {EditGroupConnectionRequestModule} from '../../../../../../../module/group/edit-group-connection-request/edit-group-connection-request.module';

@NgModule({
  declarations: [GroupOutcomingRequestsComponent],
  imports: [
    CommonModule,
    GroupOutcomingRequestsRoutingModule,
    NgxGridModule,
    TranslateModule.forChild(),
    EditGroupConnectionRequestModule
  ]
})
export class GroupOutcomingRequestsModule {
}
