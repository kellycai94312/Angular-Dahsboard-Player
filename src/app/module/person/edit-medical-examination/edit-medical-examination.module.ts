import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditMedicalExaminationComponent} from './edit-medical-examination/edit-medical-examination.component';
import {AttachFileModule} from '../../../components/attach-file/attach-file.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxDateModule} from '../../ngx/ngx-date/ngx-date.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EditMedicalExaminationComponent],
  entryComponents: [EditMedicalExaminationComponent],
  exports: [EditMedicalExaminationComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxDateModule,
    NgxSelectModule,
    AttachFileModule,
    FormsModule
  ]
})
export class EditMedicalExaminationModule {
}
