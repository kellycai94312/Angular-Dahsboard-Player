import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PositionsGroupSettingsRoutingModule} from './positions-group-settings-routing.module';
import {PositionsGroupSettingsComponent} from './positions-group-settings/positions-group-settings.component';

@NgModule({
  declarations: [PositionsGroupSettingsComponent],
  imports: [
    CommonModule,
    PositionsGroupSettingsRoutingModule
  ]
})
export class PositionsGroupSettingsModule {
}
