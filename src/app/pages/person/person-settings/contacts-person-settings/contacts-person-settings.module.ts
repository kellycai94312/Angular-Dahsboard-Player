import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsPersonSettingsRoutingModule} from './contacts-person-settings-routing.module';
import {ContactsPersonSettingsComponent} from './contacts-person-settings/contacts-person-settings.component';
import {PersonContactListModule} from '../../../../module/person/person-contact-list/person-contact-list.module';

@NgModule({
  declarations: [ContactsPersonSettingsComponent],
  imports: [
    CommonModule,
    ContactsPersonSettingsRoutingModule,
    PersonContactListModule
  ]
})
export class ContactsPersonSettingsModule {
}
