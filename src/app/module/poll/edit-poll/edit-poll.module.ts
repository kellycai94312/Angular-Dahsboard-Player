import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditPollComponent} from './edit-poll/edit-poll.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {MatButtonModule} from '@angular/material';
import {PollQuestionItemModule} from '../poll-question-item/poll-question-item.module';
import {TranslateModule} from '@ngx-translate/core';
import {NgxSelectModule} from '../../ngx/ngx-select/ngx-select.module';
import {EditPollQuestionModule} from '../../event/edit-poll-question/edit-poll-question.module';

@NgModule({
  declarations: [EditPollComponent],
  entryComponents: [EditPollComponent],
  exports: [EditPollComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    NgxSelectModule,
    PollQuestionItemModule,
    EditPollQuestionModule
  ]
})
export class EditPollModule {
}
