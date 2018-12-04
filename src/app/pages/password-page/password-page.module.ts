import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordPageRoutingModule} from './password-page-routing.module';
import {PasswordResetPageModule} from './password-reset-page/password-reset-page.module';

@NgModule({
  imports: [
    CommonModule,
    PasswordPageRoutingModule,
    PasswordResetPageModule
  ],
  declarations: []
})
export class PasswordPageModule {
}
