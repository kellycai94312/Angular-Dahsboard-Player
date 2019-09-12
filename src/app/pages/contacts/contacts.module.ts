import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsRoutingModule} from './contacts-routing.module';
import {ContactsComponent} from './contacts/contacts.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {ListHeadingModule} from '../../module/common/list-heading/list-heading.module';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatRippleModule,
    MatIconModule,
    FlexLayoutModule,
    ListHeadingModule,
    TranslateModule.forChild()
  ]
})
export class ContactsModule {
}
