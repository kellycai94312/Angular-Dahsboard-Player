import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonSignUpRoutingModule} from './person-sign-up-routing.module';
import {PersonSignUpComponent} from './person-sign-up/person-sign-up.component';
import {MatButtonModule} from '@angular/material';
import {LogoCardModule} from '../../../module/common/logo-card/logo-card.module';
import {NgxInputModule} from '../../../module/ngx/ngx-input/ngx-input.module';
import {NgxDateModule} from '../../../module/ngx/ngx-date/ngx-date.module';
import {NgxSelectModule} from '../../../module/ngx/ngx-select/ngx-select.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [PersonSignUpComponent],
  imports: [
    CommonModule,
    PersonSignUpRoutingModule,
    MatButtonModule,
    TranslateModule.forChild(),
    LogoCardModule,
    NgxInputModule,
    NgxDateModule,
    NgxSelectModule
  ]
})
export class PersonSignUpModule {
}
