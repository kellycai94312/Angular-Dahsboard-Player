import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [DashboardPageComponent]
})
export class DashboardModule {
}
