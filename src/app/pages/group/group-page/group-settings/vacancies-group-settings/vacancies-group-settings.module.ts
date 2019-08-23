import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VacanciesGroupSettingsRoutingModule} from './vacancies-group-settings-routing.module';
import {VacanciesGroupSettingsComponent} from './vacancies-group-settings/vacancies-group-settings.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GroupPositionItemModule} from '../../../../../module/group/group-position/group-position-item/group-position-item.module';

@NgModule({
  declarations: [VacanciesGroupSettingsComponent],
  imports: [
    CommonModule,
    VacanciesGroupSettingsRoutingModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    GroupPositionItemModule
  ]
})
export class VacanciesGroupSettingsModule {
}
