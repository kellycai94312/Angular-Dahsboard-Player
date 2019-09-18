import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDateModule } from '../../ngx/ngx-date/ngx-date.module';
import { NgxInputModule } from '../../ngx/ngx-input/ngx-input.module';
import { NgxSelectModule } from '../../ngx/ngx-select/ngx-select.module';
import { EditMedicalExaminationComponent } from './edit-medical-examination/edit-medical-examination.component';

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
    FormsModule
  ]
})
export class EditMedicalExaminationModule {
}
