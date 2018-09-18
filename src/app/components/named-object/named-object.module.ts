import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {DxTextAreaModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {NamedObjectComponent} from './named-object/named-object.component';
import {PreviewNamedObjectComponent} from './preview-named-object/preview-named-object.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxValidatorModule,
    DxTextAreaModule
  ],
  declarations: [NamedObjectComponent, PreviewNamedObjectComponent],
  exports: [NamedObjectComponent, PreviewNamedObjectComponent],
  entryComponents: [NamedObjectComponent, PreviewNamedObjectComponent]
})
export class NamedObjectModule {
}
