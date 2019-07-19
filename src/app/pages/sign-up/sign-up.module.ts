import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {SignUpRoutingModule} from './sign-up-routing.module';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MatButtonModule} from '@angular/material';
import {NgxInputModule} from '../../module/ngx/ngx-input/ngx-input.module';
import {LogoCardModule} from '../../module/common/logo-card/logo-card.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    MatButtonModule,
    TranslateModule.forChild(),
    NgxInputModule,
    LogoCardModule
  ]
})
export class SignUpModule {
}
