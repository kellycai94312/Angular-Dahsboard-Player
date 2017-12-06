import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DxButtonModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';

import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxButtonModule,
    TranslateModule.forChild()
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule {
}
