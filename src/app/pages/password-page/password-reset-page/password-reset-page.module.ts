import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DxTextBoxModule, DxButtonModule, DxValidatorModule } from 'devextreme-angular';

import { PasswordResetPageComponent } from './password-reset-page.component';

@NgModule({
  imports: [
    CommonModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
    TranslateModule.forChild()
  ],
  declarations: [PasswordResetPageComponent]
})
export class PasswordResetPageModule { }
