import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonPageComponent} from './person-page/person-page.component';
import {PersonPageRoutingModule} from './person-page-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PersonHeadModule} from '../../../module/person/person-head/person-head.module';
import {NgxTabsModule} from '../../../module/ngx/ngx-tabs/ngx-tabs.module';

@NgModule({
  declarations: [PersonPageComponent],
  imports: [
    CommonModule,
    PersonPageRoutingModule,
    FlexLayoutModule,
    NgxTabsModule,
    PersonHeadModule
  ]
})
export class PersonPageModule {
}
