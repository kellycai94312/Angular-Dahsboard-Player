import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddressGroupSettingsComponent} from './address-group-settings/address-group-settings.component';

const routes: Routes = [{path: '', component: AddressGroupSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressGroupSettingsRoutingModule {
}
