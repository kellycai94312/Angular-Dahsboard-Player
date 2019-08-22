import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PositionsGroupSettingsComponent} from './positions-group-settings/positions-group-settings.component';

const routes: Routes = [{path: '', component: PositionsGroupSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionsGroupSettingsRoutingModule {
}
