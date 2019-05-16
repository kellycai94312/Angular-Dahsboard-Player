import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPollQuestionComponent} from './edit-poll-question/edit-poll-question.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCheckboxModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EditPollQuestionComponent],
  entryComponents: [EditPollQuestionComponent],
  exports: [EditPollQuestionComponent],
  imports: [
    CommonModule,
    NgxInputModule,
    NgxSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    FormsModule,
    TranslateModule.forChild()
  ]
})
export class EditPollQuestionModule {
}
