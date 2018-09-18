import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DictionaryTypeComponent} from './dictionary-type/dictionary-type.component';
import {DxSelectBoxModule} from 'devextreme-angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DxSelectBoxModule,
    TranslateModule.forChild()
  ],
  declarations: [DictionaryTypeComponent],
  exports: [DictionaryTypeComponent],
  entryComponents: [DictionaryTypeComponent]
})
export class DictionaryTypeModule {
}
