import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonSettingsPageComponent} from './person-settings-page/person-settings-page.component';

const routes: Routes = [
  {path: '', component: PersonSettingsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonSettingsPageRoutingModule {
}
