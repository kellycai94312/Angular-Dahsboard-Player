import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {GroupModule} from '../../components/group/group.module';
import {NgxTabModule} from '../../components/ngx-tab/ngx-tab.module';
import {NgxImageModule} from '../../components/ngx-image/ngx-image.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forChild(),
    NgxVirtualScrollModule,
    NgxTabModule,
    NgxImageModule,
    GroupModule,
    FlexLayoutModule
  ],
  declarations: [DashboardPageComponent]
})
export class DashboardModule {
}
