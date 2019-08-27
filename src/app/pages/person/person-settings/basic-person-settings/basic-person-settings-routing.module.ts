import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BasicPersonSettingsComponent} from './basic-person-settings/basic-person-settings.component';

const routes: Routes = [{path: '', component: BasicPersonSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicPersonSettingsRoutingModule {
}
