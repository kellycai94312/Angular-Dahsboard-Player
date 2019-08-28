import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvitesGroupSettingsComponent} from './invites-group-settings/invites-group-settings.component';

const routes: Routes = [{path: '', component: InvitesGroupSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitesGroupSettingsRoutingModule {
}
