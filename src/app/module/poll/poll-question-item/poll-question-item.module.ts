import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PollQuestionItemComponent} from './poll-question-item/poll-question-item.component';
import {MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatRadioModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NgxInputModule} from '../../ngx/ngx-input/ngx-input.module';
import {EditPollQuestionAnswerModule} from '../../event/edit-poll-question-answer/edit-poll-question-answer.module';

@NgModule({
  declarations: [PollQuestionItemComponent],
  exports: [PollQuestionItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatRadioModule,
    FlexLayoutModule,
    TranslateModule.forChild(),
    NgxInputModule,
    EditPollQuestionAnswerModule
  ]
})
export class PollQuestionItemModule {
}
