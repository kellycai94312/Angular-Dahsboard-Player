import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BasicGroupSettingsComponent} from './basic-group-settings/basic-group-settings.component';

const routes: Routes = [{path: '', component: BasicGroupSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicGroupSettingsRoutingModule {
}
