import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonEnableSignUpRoutingModule} from './person-enable-sign-up-routing.module';
import {PersonEnableSignUpComponent} from './person-enable-sign-up/person-enable-sign-up.component';
import {PasswordSetModule} from '../../../components/password-set/password-set.module';

@NgModule({
  declarations: [PersonEnableSignUpComponent],
  imports: [
    CommonModule,
    PersonEnableSignUpRoutingModule,
    PasswordSetModule
  ]
})
export class PersonEnableSignUpModule {
}
