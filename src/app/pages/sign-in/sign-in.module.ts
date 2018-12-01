import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in/sign-in.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxInputModule} from '../../components/ngx-input/ngx-input.module';
import {NgxFormModule} from '../../components/ngx-form/ngx-form.module';
import {NgxButtonModule} from '../../components/ngx-button/ngx-button.module';
import {SignInRoutingModule} from './sign-in-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxFormModule,
    NgxButtonModule
  ],
  declarations: [SignInComponent]
})
export class SignInModule {
}
