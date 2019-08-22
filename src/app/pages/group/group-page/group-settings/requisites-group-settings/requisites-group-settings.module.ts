import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequisitesGroupSettingsRoutingModule} from './requisites-group-settings-routing.module';
import {RequisitesGroupSettingsComponent} from './requisites-group-settings/requisites-group-settings.component';
import {EditGroupDetailsModule} from '../../../../../module/group/edit/edit-group-details/edit-group-details.module';

@NgModule({
  declarations: [RequisitesGroupSettingsComponent],
  imports: [
    CommonModule,
    RequisitesGroupSettingsRoutingModule,
    EditGroupDetailsModule
  ]
})
export class RequisitesGroupSettingsModule {
}
