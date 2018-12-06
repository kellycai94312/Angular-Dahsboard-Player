import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxVirtualScrollModule} from '../../components/ngx-virtual-scroll/ngx-virtual-scroll.module';
import {GroupModule} from '../../components/group/group.module';
import {ImageModule} from '../../components/image/image.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forChild(),
    NgxVirtualScrollModule,
    GroupModule,
    ImageModule
  ],
  declarations: [DashboardPageComponent]
})
export class DashboardModule {
}
