import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordResetPageComponent} from './password-reset-page.component';
import {PasswordSetModule} from '../../../components/password-set/password-set.module';

@NgModule({
  imports: [
    CommonModule,
    PasswordSetModule
  ],
  declarations: [PasswordResetPageComponent]
})
export class PasswordResetPageModule {
}
