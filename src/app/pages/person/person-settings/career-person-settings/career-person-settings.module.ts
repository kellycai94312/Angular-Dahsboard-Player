import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CareerPersonSettingsRoutingModule} from './career-person-settings-routing.module';
import {CareerPersonSettingsComponent} from './career-person-settings/career-person-settings.component';
import {CareerPersonModule} from '../../../../module/person/career-person/career-person.module';

@NgModule({
  declarations: [CareerPersonSettingsComponent],
  imports: [
    CommonModule,
    CareerPersonSettingsRoutingModule,
    CareerPersonModule
  ]
})
export class CareerPersonSettingsModule {
}
