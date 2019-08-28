import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonContactListComponent} from './person-contact-list/person-contact-list.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EditPersonContactModule} from '../edit-person-contact/edit-person-contact.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PersonContactListComponent],
  exports: [PersonContactListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    EditPersonContactModule
  ]
})
export class PersonContactListModule {
}
