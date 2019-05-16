import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPollQuestionAnswerComponent} from './edit-poll-question-answer/edit-poll-question-answer.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [EditPollQuestionAnswerComponent],
  entryComponents: [EditPollQuestionAnswerComponent],
  exports: [EditPollQuestionAnswerComponent],
  imports: [
    CommonModule,
    NgxInputModule,
    FlexLayoutModule
  ]
})
export class EditPollQuestionAnswerModule {
}
