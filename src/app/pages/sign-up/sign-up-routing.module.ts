import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GeneralSignUpComponent} from './step/general-sign-up/general-sign-up.component';
import {AuthDenyGuard} from '../../guard/auth-deny.guard';
import {EnvironmentGuard} from '../../guard/environment.guard';
import {RegistrationPersonPageGuard} from '../../guard/registration-person-page.guard';
import {PersonSignUpComponent} from './step/person-sign-up/person-sign-up.component';
import {PersonEnableSignUpComponent} from './person-enable-sign-up/person-enable-sign-up.component';

const routes: Routes = [
  {path: '', component: GeneralSignUpComponent, canActivate: [AuthDenyGuard, EnvironmentGuard]},
  {path: 'person', component: PersonSignUpComponent, canActivate: [RegistrationPersonPageGuard, EnvironmentGuard]},
  {path: 'enable', component: PersonEnableSignUpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule {
}
