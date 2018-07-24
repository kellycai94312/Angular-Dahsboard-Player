import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DxTextAreaModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {NamedObjectComponent} from './named-object/named-object.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxValidatorModule,
    DxTextAreaModule
  ],
  declarations: [NamedObjectComponent],
  exports: [NamedObjectComponent]
})
export class NamedObjectModule {
}
