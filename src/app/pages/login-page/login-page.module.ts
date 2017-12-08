import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DxButtonModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';

import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LocaleModule } from '../../components/locale/locale.module';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxButtonModule,
    LocaleModule,
    TranslateModule.forChild()
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule {
}
