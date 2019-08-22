import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RequisitesGroupSettingsComponent} from './requisites-group-settings/requisites-group-settings.component';

const routes: Routes = [{path: '', component: RequisitesGroupSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitesGroupSettingsRoutingModule {
}
