import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxButtonModule} from '../../../../../components/ngx-button/ngx-button.module';
import {NgxVirtualScrollModule} from '../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {GroupModule} from '../../../../../components/group/group.module';
import {GroupNewsPageRoutingModule} from './group-news-page-routing.module';
import {GroupNewsPageComponent} from './group-news-page/group-news-page.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    GroupNewsPageRoutingModule,
    NgxButtonModule,
    NgxVirtualScrollModule,
    GroupModule,
    FlexLayoutModule
  ],
  declarations: [GroupNewsPageComponent]
})
export class GroupNewsPageModule {
}
