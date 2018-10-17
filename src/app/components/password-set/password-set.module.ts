import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordSetComponent} from './password-set.component';
import {DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';

@NgModule({
  imports: [
    CommonModule,
    DxTextBoxModule,
    DxValidatorModule,
    TranslateModule.forChild(),
    NgxButtonModule
  ],
  exports: [PasswordSetComponent],
  declarations: [PasswordSetComponent]
})
export class PasswordSetModule {
}
