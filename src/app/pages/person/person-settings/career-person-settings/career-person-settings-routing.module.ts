import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CareerPersonSettingsComponent} from './career-person-settings/career-person-settings.component';

const routes: Routes = [{path: '', component: CareerPersonSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerPersonSettingsRoutingModule {
}
