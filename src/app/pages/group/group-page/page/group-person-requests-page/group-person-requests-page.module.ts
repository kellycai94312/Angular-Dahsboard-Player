import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupPersonRequestsPageComponent} from './group-person-requests-page/group-person-requests-page.component';
import {NgxVirtualScrollModule} from '../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {GroupPersonRequestsPageRoutingModule} from './group-person-requests-page-routing.module';
import {NgxSplitButtonModule} from '../../../../../components/ngx-split-button/ngx-split-button.module';
import {GroupPersonItemModule} from '../../../../../module/group/group-person-item/group-person-item.module';

@NgModule({
  imports: [
    CommonModule,
    GroupPersonRequestsPageRoutingModule,
    NgxVirtualScrollModule,
    NgxSplitButtonModule,
    GroupPersonItemModule
  ],
  declarations: [GroupPersonRequestsPageComponent]
})
export class GroupPersonRequestsPageModule {
}
