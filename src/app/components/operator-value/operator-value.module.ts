import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OperatorValueComponent} from './operator-value/operator-value.component';
import {TranslateModule} from '@ngx-translate/core';
import {DxNumberBoxModule, DxSelectBoxModule} from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxSelectBoxModule,
    DxNumberBoxModule
  ],
  declarations: [OperatorValueComponent],
  exports: [OperatorValueComponent]
})
export class OperatorValueModule {
}
