import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PositionsGroupSettingsRoutingModule} from './positions-group-settings-routing.module';
import {PositionsGroupSettingsComponent} from './positions-group-settings/positions-group-settings.component';
import {GroupPositionItemModule} from '../../../../../module/group/group-position/group-position-item/group-position-item.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {EditGroupPositionModule} from '../../../../../module/group/group-position/edit-group-position/edit-group-position.module';

@NgModule({
  declarations: [PositionsGroupSettingsComponent],
  imports: [
    CommonModule,
    PositionsGroupSettingsRoutingModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    GroupPositionItemModule,
    EditGroupPositionModule
  ]
})
export class PositionsGroupSettingsModule {
}
