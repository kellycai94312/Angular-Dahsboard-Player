import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GroupOutcomingRequestsRoutingModule} from './group-outcoming-requests-routing.module';
import {GroupOutcomingRequestsComponent} from './group-outcoming-requests/group-outcoming-requests.component';

@NgModule({
  declarations: [GroupOutcomingRequestsComponent],
  imports: [
    CommonModule,
    GroupOutcomingRequestsRoutingModule
  ]
})
export class GroupOutcomingRequestsModule {
}
