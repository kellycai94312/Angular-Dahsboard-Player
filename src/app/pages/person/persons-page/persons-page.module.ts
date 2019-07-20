import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsPageComponent} from './persons-page/persons-page.component';
import {PersonsPageRoutingModule} from './persons-page-routing.module';
import {OldEditPersonModule} from '../../../module/person/old-edit-person/old-edit-person.module';
import {NgxTabsModule} from '../../../module/ngx/ngx-tabs/ngx-tabs.module';
import {ListHeadingModule} from '../../../module/common/list-heading/list-heading.module';

@NgModule({
  imports: [
    CommonModule,
    PersonsPageRoutingModule,
    NgxTabsModule,
    OldEditPersonModule,
    ListHeadingModule
  ],
  declarations: [PersonsPageComponent]
})
export class PersonsPageModule {
}
