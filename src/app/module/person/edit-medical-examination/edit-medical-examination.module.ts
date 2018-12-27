import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditMedicalExaminationComponent} from './edit-medical-examination/edit-medical-examination.component';
import {DxCheckBoxModule, DxDateBoxModule, DxSelectBoxModule, DxTextBoxModule, DxValidatorModule} from 'devextreme-angular';
import {AttachFileModule} from '../../../components/attach-file/attach-file.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    DxSelectBoxModule,
    DxValidatorModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    DxDateBoxModule,
    AttachFileModule
  ],
  declarations: [EditMedicalExaminationComponent],
  entryComponents: [EditMedicalExaminationComponent],
  exports: [EditMedicalExaminationComponent]
})
export class EditMedicalExaminationModule {
}
