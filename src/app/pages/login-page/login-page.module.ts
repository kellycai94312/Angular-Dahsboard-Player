import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  DxSelectBoxModule,
  DxTextAreaModule,
  DxDateBoxModule,
  DxTextBoxModule,
  DxFormModule,
  DxButtonModule
} from 'devextreme-angular';



import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from "./login-page-routing.module";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    DxSelectBoxModule,
    DxTextAreaModule,
    DxDateBoxModule,
    DxTextBoxModule,
    DxFormModule,
    DxButtonModule,
    TranslateModule.forChild()
  ],
  declarations: [LoginPageComponent]
})
export class LoginPageModule { }