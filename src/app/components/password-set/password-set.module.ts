import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordSetComponent} from './password-set.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxButtonModule} from '../ngx-button/ngx-button.module';
import {RouterModule} from '@angular/router';
import {NgxInputModule} from '../ngx-input/ngx-input.module';
import {NgxFormModule} from '../ngx-form/ngx-form.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([]),
    NgxButtonModule,
    NgxInputModule,
    NgxFormModule
  ],
  exports: [PasswordSetComponent],
  declarations: [PasswordSetComponent]
})
export class PasswordSetModule {
}
