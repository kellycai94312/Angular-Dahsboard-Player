import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MedicalExaminationListComponent} from './medical-examination-list/medical-examination-list.component';
import {EditMedicalExaminationModule} from '../edit-medical-examination/edit-medical-examination.module';
import {MatButtonModule, MatDividerModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxGridModule} from '../../../components/ngx-grid/ngx-grid.module';

@NgModule({
  declarations: [MedicalExaminationListComponent],
  exports: [MedicalExaminationListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    NgxGridModule,
    EditMedicalExaminationModule
  ]
})
export class MedicalExaminationListModule {
}
