import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicGroupSettingsRoutingModule} from './basic-group-settings-routing.module';
import {BasicGroupSettingsComponent} from './basic-group-settings/basic-group-settings.component';
import {EditGroupModule} from '../../../../../module/group/edit-group/edit-group.module';

@NgModule({
  declarations: [BasicGroupSettingsComponent],
  imports: [
    CommonModule,
    BasicGroupSettingsRoutingModule,
    EditGroupModule
  ]
})
export class BasicGroupSettingsModule {
}
