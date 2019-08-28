import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicPersonSettingsRoutingModule} from './basic-person-settings-routing.module';
import {BasicPersonSettingsComponent} from './basic-person-settings/basic-person-settings.component';
import {BasicPersonModule} from '../../../../module/person/basic-person/basic-person.module';

@NgModule({
  declarations: [BasicPersonSettingsComponent],
  imports: [
    CommonModule,
    BasicPersonSettingsRoutingModule,
    BasicPersonModule
  ]
})
export class BasicPersonSettingsModule {
}
