import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VacanciesGroupSettingsComponent} from './vacancies-group-settings/vacancies-group-settings.component';

const routes: Routes = [{path: '', component: VacanciesGroupSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacanciesGroupSettingsRoutingModule {
}
