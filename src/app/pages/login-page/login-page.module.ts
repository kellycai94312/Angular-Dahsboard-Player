import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {LoginPageComponent} from './login-page.component';
import {LoginPageRoutingModule} from './login-page-routing.module';
import {LocaleModule} from '../../components/locale/locale.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    DxValidatorModule,
    DxTextBoxModule,
    LocaleModule,
    TranslateModule.forChild(),
    NgxButtonModule
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule {
}
