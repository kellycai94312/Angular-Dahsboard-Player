import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ListHeadingModule } from 'app/module/common/list-heading/list-heading.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    MatRippleModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    ListHeadingModule,
    TranslateModule.forChild()
  ]
})
export class ContactsModule {
}
