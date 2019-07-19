import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {TranslateModule} from '@ngx-translate/core';
import {SignInRoutingModule} from './sign-in-routing.module';
import {NgxInputModule} from '../../module/ngx/ngx-input/ngx-input.module';
import {LogoCardModule} from '../../module/common/logo-card/logo-card.module';
import {MatButtonModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    LogoCardModule
  ],
  declarations: [SignInComponent]
})
export class SignInModule {
}
