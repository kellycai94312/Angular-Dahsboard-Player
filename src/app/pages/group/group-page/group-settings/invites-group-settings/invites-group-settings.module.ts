import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvitesGroupSettingsRoutingModule} from './invites-group-settings-routing.module';
import {InvitesGroupSettingsComponent} from './invites-group-settings/invites-group-settings.component';

@NgModule({
  declarations: [InvitesGroupSettingsComponent],
  imports: [
    CommonModule,
    InvitesGroupSettingsRoutingModule
  ]
})
export class InvitesGroupSettingsModule {
}
