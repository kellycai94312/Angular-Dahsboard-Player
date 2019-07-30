import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsPageComponent} from './persons-page/persons-page.component';
import {PersonsPageRoutingModule} from './persons-page-routing.module';
import {NgxTabsModule} from '../../../module/ngx/ngx-tabs/ngx-tabs.module';
import {ListHeadingModule} from '../../../module/common/list-heading/list-heading.module';

@NgModule({
  imports: [
    CommonModule,
    PersonsPageRoutingModule,
    NgxTabsModule,
    ListHeadingModule
  ],
  declarations: [PersonsPageComponent]
})
export class PersonsPageModule {
}
