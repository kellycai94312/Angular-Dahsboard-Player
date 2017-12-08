import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {
  DxButtonModule,
  DxDateBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';

import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationPersonPageComponent } from './registration-person-page/registration-person-page.component';
import { RegistrationPageRoutingModule } from './registration-page-routing.module';
import { LocaleModule } from '../../components/locale/locale.module';
import { RegistrationVerificationPageComponent } from './registration-verification-page/registration-verification-page.component';

@NgModule({
  imports: [
    CommonModule,
    RegistrationPageRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    LocaleModule,
    TranslateModule.forChild()
  ],
  declarations: [
    RegistrationPageComponent,
    RegistrationPersonPageComponent,
    RegistrationVerificationPageComponent]
})
export class RegistrationPageModule {
}
