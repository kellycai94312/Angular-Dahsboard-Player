import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupIncomingRequestsRoutingModule} from './group-incoming-requests-routing.module';
import {GroupIncomingRequestsComponent} from './group-incoming-requests/group-incoming-requests.component';

@NgModule({
  declarations: [GroupIncomingRequestsComponent],
  imports: [
    CommonModule,
    GroupIncomingRequestsRoutingModule
  ]
})
export class GroupIncomingRequestsModule {
}
