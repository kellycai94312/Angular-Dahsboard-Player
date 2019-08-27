import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsPersonSettingsRoutingModule} from './contacts-person-settings-routing.module';
import {ContactsPersonSettingsComponent} from './contacts-person-settings/contacts-person-settings.component';

@NgModule({
  declarations: [ContactsPersonSettingsComponent],
  imports: [
    CommonModule,
    ContactsPersonSettingsRoutingModule
  ]
})
export class ContactsPersonSettingsModule {
}
