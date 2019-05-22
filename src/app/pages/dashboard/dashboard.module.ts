import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {GroupModule} from '../../components/group/group.module';
import {NgxImageModule} from '../../components/ngx-image/ngx-image.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxTabsModule} from '../../module/ngx/ngx-tabs/ngx-tabs.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxVirtualScrollModule,
    NgxTabsModule,
    NgxImageModule,
    FlexLayoutModule,
    GroupModule
  ],
  declarations: [DashboardPageComponent]
})
export class DashboardModule {
}
