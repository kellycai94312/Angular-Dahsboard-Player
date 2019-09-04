import {Component, Input} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {PollQuestionAnswer} from '../../../../data/remote/model/poll/poll-question-answer';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PollQuestion} from '../../../../data/remote/model/poll/poll-question';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {Validators} from '@angular/forms';
import {PollApiService} from '../../../../data/remote/rest-api/api/poll/poll-api.service';
import {Poll} from '../../../../data/remote/model/poll/poll';

@Component({
  selector: 'app-edit-poll-question-answer',
  templateUrl: './edit-poll-question-answer.component.html',
  styleUrls: ['./edit-poll-question-answer.component.scss']
})
export class EditPollQuestionAnswerComponent extends BaseEditComponent<PollQuestionAnswer> {

  @Input()
  public poll: Poll;

  @Input()
  public pollQuestion: PollQuestion;

  public answerNgxInput: NgxInput;

  // TODO: public pointsNgxInput: NgxInput;

  constructor(private _pollApiService: PollApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: PollQuestionAnswer): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.answerNgxInput = new NgxInput();
        this.answerNgxInput.labelTranslation = 'answer';
        this.answerNgxInput.required = true;
        this.answerNgxInput.type = NgxInputType.TEXTAREA;
        this.answerNgxInput.rows = 4;
        this.answerNgxInput.control.setValidators([Validators.required]);
        this.answerNgxInput.control.setValue(data.name);

        // this.pointsNgxInput = new NgxInput();
        // this.pointsNgxInput.labelTranslation = 'points';
        // this.pointsNgxInput.control.setValidators([Validators.pattern('([0-9]|[1-8][0-9]|9[0-9]|100)')]);
        // this.pointsNgxInput.control.setValue(data.points);
      });
    }
    return result;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._pollApiService.removePollQuestionAnswer(this.poll, this.pollQuestion, this.data).toPromise();
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.name = this.answerNgxInput.control.value;
      // this.data.points = this.pointsNgxInput.control.value;

      this.data = await this._pollApiService.savePollQuestionAnswer(this.poll, this.pollQuestion, this.data).toPromise();
    });
  }

}
