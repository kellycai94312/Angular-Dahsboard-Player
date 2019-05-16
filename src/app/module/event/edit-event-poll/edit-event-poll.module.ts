import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditEventPollComponent} from './edit-event-poll/edit-event-poll.component';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {NgxButtonModule} from '../../../components/ngx-button/ngx-button.module';
import {EditPollQuestionModule} from '../edit-poll-question/edit-poll-question.module';
import {PollQuestionItemModule} from '../poll-question-item/poll-question-item.module';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [EditEventPollComponent],
  entryComponents: [EditEventPollComponent],
  exports: [EditEventPollComponent],
  imports: [
    CommonModule,
    NgxInputModule,
    NgxButtonModule,
    EditPollQuestionModule,
    PollQuestionItemModule,
    FlexLayoutModule
  ]
})
export class EditEventPollModule {
}
