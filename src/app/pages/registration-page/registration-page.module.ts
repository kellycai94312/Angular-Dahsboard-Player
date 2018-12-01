import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule,} from 'devextreme-angular';
import {RegistrationPageComponent} from './registration-page.component';
import {RegistrationPersonPageComponent} from './registration-person-page/registration-person-page.component';
import {RegistrationPageRoutingModule} from './registration-page-routing.module';
import {LocaleModule} from '../../components/locale/locale.module';
import {BusyIndicatorModule} from '../../components/busy-indicator/busy-indicator.module';
import {RegistrationPersonEnableComponent} from './registration-person-enable/registration-person-enable.component';
import {PasswordSetModule} from '../../components/password-set/password-set.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    RegistrationPageRoutingModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    LocaleModule,
    BusyIndicatorModule,
    PasswordSetModule,
    TranslateModule.forChild(),
    NgxButtonModule
  ],
  declarations: [
    RegistrationPageComponent,
    RegistrationPersonPageComponent,
    RegistrationPersonEnableComponent
  ]
})
export class RegistrationPageModule {
}
