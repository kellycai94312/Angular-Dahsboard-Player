import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DxTextBoxModule, DxButtonModule, DxValidatorModule, } from 'devextreme-angular';

import { RegistrationPageComponent } from './registration-page.component';
import { RegistrationPageRoutingModule } from './registration-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RegistrationPageRoutingModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
    TranslateModule.forChild()
  ],
  declarations: [RegistrationPageComponent]
})
export class RegistrationPageModule { }