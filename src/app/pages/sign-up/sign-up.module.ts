import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GeneralSignUpComponent} from './step/general-sign-up/general-sign-up.component';
import {PersonSignUpComponent} from './step/person-sign-up/person-sign-up.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../components/ngx-input/ngx-input.module';
import {NgxFormModule} from '../../components/ngx-form/ngx-form.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';
import {SignUpRoutingModule} from './sign-up-routing.module';
import {DxDateBoxModule, DxSelectBoxModule} from 'devextreme-angular';
import {NgxModalModule} from '../../components/ngx-modal/ngx-modal.module';
import {HtmlContentModule} from '../../components/html-content/html-content.module';
import {PersonEnableSignUpComponent} from './person-enable-sign-up/person-enable-sign-up.component';
import {PasswordSetModule} from '../../components/password-set/password-set.module';

@NgModule({
  imports: [
    CommonModule,
    SignUpRoutingModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxFormModule,
    NgxButtonModule,
    // TODO: Remove this import
    DxDateBoxModule,
    // TODO: Remove this import
    DxSelectBoxModule,
    NgxModalModule,
    HtmlContentModule,
    // TODO: Remove this import
    PasswordSetModule
  ],
  declarations: [GeneralSignUpComponent, PersonSignUpComponent, PersonEnableSignUpComponent]
})
export class SignUpModule {
}
