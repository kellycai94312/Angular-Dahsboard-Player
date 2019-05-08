import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PollQuestion} from '../../../../data/remote/model/training/poll/poll-question';
import {PollQuestionAnswer} from '../../../../data/remote/model/training/poll/poll-question-answer';
import {AnswerTypeEnum} from '../../../../data/remote/model/training/poll/answer-type-enum';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {Validators} from '@angular/forms';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditPollQuestionAnswerComponent} from '../../edit-poll-question-answer/edit-poll-question-answer/edit-poll-question-answer.component';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'app-poll-question-item',
  templateUrl: './poll-question-item.component.html',
  styleUrls: ['./poll-question-item.component.scss']
})
export class PollQuestionItemComponent implements OnInit {

  @Input()
  public canEdit: boolean;

  @Input()
  public canExecutePoll: boolean;

  @Input()
  public data: PollQuestion;

  @Output()
  public readonly editPollQuestion = new EventEmitter<PollQuestion>();

  public readonly answerTypeEnumClass = AnswerTypeEnum;
  public pollQuestionAnswers: PollQuestionAnswer[] = [];
  public answerNgxInput: NgxInput;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService) {
  }

  async ngOnInit() {
    this.answerNgxInput = new NgxInput();
    this.answerNgxInput.labelTranslation = 'answer';
    this.answerNgxInput.type = NgxInputType.TEXTAREA;
    this.answerNgxInput.required = true;
    this.answerNgxInput.control.setValidators([Validators.required]);

    await this.refreshPollQuestionAnswers();
  }

  public onEdit(): void {
    this.editPollQuestion.emit(this.data);
  }

  public onApply() {
    // TODO: Add implementation
  }

  public async onAddAnswer(): Promise<void> {
    if (await this.showEditPollQuestionAnswer(new PollQuestionAnswer())) {
      await this.refreshPollQuestionAnswers();
    }
  }

  public async onEditAnswer(obj: PollQuestionAnswer): Promise<void> {
    if (await this.showEditPollQuestionAnswer(obj)) {
      await this.refreshPollQuestionAnswers();
    }
  }

  private async showEditPollQuestionAnswer(obj: PollQuestionAnswer): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditPollQuestionAnswerComponent, async component => {
      component.pollQuestion = this.data;

      await component.initialize(this._appHelper.cloneObject(obj));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          await this._ngxModalService.save(modal, component);
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          await this._ngxModalService.remove(modal, component);
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});
    return await this._ngxModalService.awaitModalResult(modal);
  }

  private async refreshPollQuestionAnswers(): Promise<void> {
    if (this.data.answerTypeEnum === AnswerTypeEnum.FREE_ANSWER || this.data.answerTypeEnum === AnswerTypeEnum.PARAMETERIZED_ANSWER) {
      this.pollQuestionAnswers = [new PollQuestionAnswer()];
    } else {
      this.pollQuestionAnswers = await this._participantRestApiService.getPollQuestionAnswers({pollQuestionId: this.data.id});
    }
  }

}
