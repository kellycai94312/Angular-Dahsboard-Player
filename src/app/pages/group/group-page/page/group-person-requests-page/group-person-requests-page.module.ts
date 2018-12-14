import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPersonRequestsPageComponent} from './group-person-requests-page/group-person-requests-page.component';
import {NgxVirtualScrollModule} from '../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {GroupPersonRequestsPageRoutingModule} from './group-person-requests-page-routing.module';
import {PersonModule} from '../../../../../components/person/person.module';
import {NgxSplitButtonModule} from '../../../../../components/ngx-split-button/ngx-split-button.module';

@NgModule({
  imports: [
    CommonModule,
    GroupPersonRequestsPageRoutingModule,
    NgxVirtualScrollModule,
    NgxSplitButtonModule,
    PersonModule
  ],
  declarations: [GroupPersonRequestsPageComponent]
})
export class GroupPersonRequestsPageModule {
}
