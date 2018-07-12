import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordSetComponent} from './password-set.component';
import {DxButtonModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DxTextBoxModule,
    DxButtonModule,
    DxValidatorModule,
    TranslateModule.forChild()
  ],
  exports: [PasswordSetComponent],
  declarations: [PasswordSetComponent]
})
export class PasswordSetModule {
}
