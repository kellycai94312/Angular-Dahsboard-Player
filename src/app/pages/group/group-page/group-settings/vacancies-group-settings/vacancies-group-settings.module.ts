import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VacanciesGroupSettingsRoutingModule} from './vacancies-group-settings-routing.module';
import {VacanciesGroupSettingsComponent} from './vacancies-group-settings/vacancies-group-settings.component';

@NgModule({
  declarations: [VacanciesGroupSettingsComponent],
  imports: [
    CommonModule,
    VacanciesGroupSettingsRoutingModule
  ]
})
export class VacanciesGroupSettingsModule {
}
