import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsRoutingModule} from './contacts-routing.module';
import {ContactsComponent} from './contacts/contacts.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {ListHeadingModule} from '../../module/common/list-heading/list-heading.module';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FlexLayoutModule,
    ListHeadingModule,
    TranslateModule.forChild()
  ]
})
export class ContactsModule {
}
