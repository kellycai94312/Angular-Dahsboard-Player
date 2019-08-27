import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonSettingsComponent} from './person-settings/person-settings.component';

const routes: Routes = [
  {
    path: '', component: PersonSettingsComponent,
    children: [
      {path: '', redirectTo: 'basic', pathMatch: 'full'},
      {path: 'basic', loadChildren: './basic-person-settings/basic-person-settings.module#BasicPersonSettingsModule'},
      {path: 'contact', loadChildren: './contacts-person-settings/contacts-person-settings.module#ContactsPersonSettingsModule'},
      {path: 'career', loadChildren: './career-person-settings/career-person-settings.module#CareerPersonSettingsModule'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonSettingsRoutingModule {
}
