import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupIncomingRequestsRoutingModule} from './group-incoming-requests-routing.module';
import {GroupIncomingRequestsComponent} from './group-incoming-requests/group-incoming-requests.component';
import {NgxGridModule} from '../../../../../../../components/ngx-grid/ngx-grid.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GroupIncomingRequestsComponent],
  imports: [
    CommonModule,
    GroupIncomingRequestsRoutingModule,
    NgxGridModule,
    TranslateModule.forChild(),
  ]
})
export class GroupIncomingRequestsModule {
}
