import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonsPageComponent} from './persons-page/persons-page.component';
import {PersonsPageRoutingModule} from './persons-page-routing.module';
import {EditPersonModule} from '../../../module/person/edit-person/edit-person.module';
import {NgxTabsModule} from '../../../module/ngx/ngx-tabs/ngx-tabs.module';
import {ListHeadingModule} from '../../../module/common/list-heading/list-heading.module';

@NgModule({
  imports: [
    CommonModule,
    PersonsPageRoutingModule,
    NgxTabsModule,
    EditPersonModule,
    ListHeadingModule
  ],
  declarations: [PersonsPageComponent]
})
export class PersonsPageModule {
}
