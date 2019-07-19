import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from './sign-up/sign-up.component';
import {EnvironmentGuard} from '../../guard/environment.guard';
import {RegistrationPersonPageGuard} from '../../guard/registration-person-page.guard';
import {AuthDenyGuard} from '../../guard/auth-deny.guard';

const routes: Routes = [
  {path: '', component: SignUpComponent, canActivate: [AuthDenyGuard, EnvironmentGuard]},
  {path: 'person', loadChildren: './person-sign-up/person-sign-up.module#PersonSignUpModule', canActivate: [RegistrationPersonPageGuard, EnvironmentGuard]},
  {path: 'enable', loadChildren: './person-enable-sign-up/person-enable-sign-up.module#PersonEnableSignUpModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule {
}
