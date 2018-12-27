import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPersonRankComponent} from './edit-person-rank/edit-person-rank.component';
import {TranslateModule} from '@ngx-translate/core';
import {DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {AttachFileModule} from '../../../components/attach-file/attach-file.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxSelectBoxModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxDateBoxModule,
    AttachFileModule
  ],
  declarations: [EditPersonRankComponent],
  entryComponents: [EditPersonRankComponent],
  exports: [EditPersonRankComponent]
})
export class EditPersonRankModule {
}
