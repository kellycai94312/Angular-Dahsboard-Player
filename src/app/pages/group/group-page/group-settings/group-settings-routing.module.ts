import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GroupSettingsComponent} from './group-settings/group-settings.component';

const routes: Routes = [
  {
    path: '', component: GroupSettingsComponent,
    children: [
      {path: '', redirectTo: 'basic', pathMatch: 'full'},
      {path: 'basic', loadChildren: './basic-group-settings/basic-group-settings.module#BasicGroupSettingsModule'},
      {path: 'requisite', loadChildren: './requisites-group-settings/requisites-group-settings.module#RequisitesGroupSettingsModule'},
      {path: 'address', loadChildren: './address-group-settings/address-group-settings.module#AddressGroupSettingsModule'},
      {path: 'vacancy', loadChildren: './vacancies-group-settings/vacancies-group-settings.module#VacanciesGroupSettingsModule'},
      {path: 'position', loadChildren: './positions-group-settings/positions-group-settings.module#PositionsGroupSettingsModule'},
      {path: 'invite', loadChildren: './invites-group-settings/invites-group-settings.module#InvitesGroupSettingsModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupSettingsRoutingModule {
}
