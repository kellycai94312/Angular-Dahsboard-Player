import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPersonComponent} from './edit-person/edit-person.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {InputSelectModule} from '../../../components/input-select/input-select.module';
import {AttachFileModule} from '../../../components/attach-file/attach-file.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxTextBoxModule,
    DxValidatorModule,
    DxDateBoxModule,
    DxSelectBoxModule,
    NgxGridModule,
    NgxButtonModule,
    InputSelectModule,
    AttachFileModule
  ],
  declarations: [EditPersonComponent],
  entryComponents: [EditPersonComponent],
  exports: [EditPersonComponent],
})
export class EditPersonModule {
}
