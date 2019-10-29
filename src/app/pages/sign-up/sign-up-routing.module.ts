import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthDenyGuard } from 'app/guard/auth-deny.guard';
import { EnvironmentGuard } from 'app/guard/environment.guard';
import { RegistrationPersonPageGuard } from 'app/guard/registration-person-page.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: '', component: SignUpComponent, canActivate: [AuthDenyGuard, EnvironmentGuard]},
  {
    path: 'person',
    loadChildren: './person-sign-up/person-sign-up.module#PersonSignUpModule',
    canActivate: [RegistrationPersonPageGuard, EnvironmentGuard]
  },
  {path: 'enable', loadChildren: './person-enable-sign-up/person-enable-sign-up.module#PersonEnableSignUpModule'},
  {path: 'request', loadChildren: './group-person-request/group-person-request.module#GroupPersonRequestModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule {
}
