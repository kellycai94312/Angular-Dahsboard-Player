import { NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxFormModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule
} from 'devextreme-angular';

@NgModule()
export class DevExpressModule {

  static imports = [
    DxButtonModule,
    DxTextBoxModule,
    DxFormModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxCheckBoxModule
  ];

}