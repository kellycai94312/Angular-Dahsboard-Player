import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralSignUpComponent} from './step/general-sign-up/general-sign-up.component';
import {PersonSignUpComponent} from './step/person-sign-up/person-sign-up.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../components/ngx-input/ngx-input.module';
import {NgxFormModule} from '../../components/ngx-form/ngx-form.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';
import {SignUpRoutingModule} from './sign-up-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxFormModule,
    NgxButtonModule
  ],
  declarations: [GeneralSignUpComponent, PersonSignUpComponent]
})
export class SignUpModule {
}
