import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddressGroupSettingsRoutingModule} from './address-group-settings-routing.module';
import {AddressGroupSettingsComponent} from './address-group-settings/address-group-settings.component';

@NgModule({
  declarations: [AddressGroupSettingsComponent],
  imports: [
    CommonModule,
    AddressGroupSettingsRoutingModule
  ]
})
export class AddressGroupSettingsModule {
}
