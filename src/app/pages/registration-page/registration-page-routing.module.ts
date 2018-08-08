import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegistrationPageComponent} from './registration-page.component';
import {RegistrationPersonPageComponent} from './registration-person-page/registration-person-page.component';
import {RegistrationVerificationPageComponent} from './registration-verification-page/registration-verification-page.component';
import {AuthDenyGuard} from '../../guard/auth-deny.guard';
import {RegistrationPersonPageGuard} from '../../guard/registration-person-page.guard';
import {RegistrationPersonEnableComponent} from './registration-person-enable/registration-person-enable.component';
import {EnvironmentGuard} from '../../guard/environment.guard';

const routes: Routes = [
  {path: '', component: RegistrationPageComponent, canActivate: [AuthDenyGuard, EnvironmentGuard]},
  {path: 'person', component: RegistrationPersonPageComponent, canActivate: [RegistrationPersonPageGuard, EnvironmentGuard]},
  {path: 'verification', component: RegistrationVerificationPageComponent},
  {path: 'enable', component: RegistrationPersonEnableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationPageRoutingModule {
}
