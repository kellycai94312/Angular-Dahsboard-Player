import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordSetComponent} from './password-set/password-set.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material';
import {LogoCardModule} from '../../module/common/logo-card/logo-card.module';
import {NgxInputModule} from '../../module/ngx/ngx-input/ngx-input.module';

@NgModule({
  declarations: [PasswordSetComponent],
  exports: [PasswordSetComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    TranslateModule.forChild(),
    RouterModule.forChild([]),
    NgxInputModule,
    LogoCardModule
  ]
})
export class PasswordSetModule {
}
