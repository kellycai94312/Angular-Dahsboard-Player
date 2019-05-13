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
import {PollPerson} from '../../../../data/remote/model/training/poll/poll-person';
import {PollPersonAnswer} from '../../../../data/remote/model/training/poll/poll-person-answer';
import {MatCheckboxChange, MatRadioChange} from '@angular/material';

@Component({
  selector: 'app-poll-question-item',
  templateUrl: './poll-question-item.component.html',
  styleUrls: ['./poll-question-item.component.scss']
})
export class PollQuestionItemComponent implements OnInit {

  @Input()
  public canEdit: boolean;

  @Input()
  public data: PollQuestion;

  @Input()
  set pollPerson(value: PollPerson) {
    this._pollPerson = value;
    setTimeout(async () => {
      await this.pollExecutionInitialize(value);
    });
  }

  @Input()
  set canExecutePoll(value: boolean) {
    this._canExecutePoll = value;
    if (value) {
      this.answerNgxInput.control.enable();
    } else {
      this.answerNgxInput.control.disable();
    }
  }

  @Output()
  public readonly editPollQuestion = new EventEmitter<PollQuestion>();

  public readonly answerTypeEnumClass = AnswerTypeEnum;
  public readonly answerNgxInput = new NgxInput();
  public pollQuestionAnswers: PollQuestionAnswer[] = [];
  public personPollQuestionAnswers: PollQuestionAnswer[] = [];
  private _pollPerson: PollPerson;
  private _pollPersonAnswers: PollPersonAnswer[] = [];
  private _canExecutePoll: boolean;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _ngxModalService: NgxModalService) {
    this.answerNgxInput.labelTranslation = 'answer';
    this.answerNgxInput.type = NgxInputType.TEXTAREA;
    this.answerNgxInput.required = true;
    this.answerNgxInput.control.setValidators([Validators.required]);
  }

  public async ngOnInit() {
    await this.refreshPollQuestionAnswers();
  }

  get pollPerson(): PollPerson {
    return this._pollPerson;
  }

  get canExecutePoll(): boolean {
    return this._canExecutePoll;
  }

  public onEdit(): void {
    this.editPollQuestion.emit(this.data);
  }

  public async onApply(): Promise<void> {
    if (this.data.answerTypeEnum === AnswerTypeEnum.ONE_ANSWER || this.data.answerTypeEnum === AnswerTypeEnum.MULTIPLE_ANSWERS) {
      // TODO: Optimize remove items
      for (const item of this._pollPersonAnswers) {
        await this._participantRestApiService.removePollPersonAnswer({pollQuestionId: this.data.id, pollPersonAnswerId: item.id});
      }

      this._pollPersonAnswers = [];
      for (const item of this.personPollQuestionAnswers) {
        let pollPersonAnswer = new PollPersonAnswer();
        pollPersonAnswer.pollQuestionAnswer = item;
        pollPersonAnswer = await this._participantRestApiService.createPollPersonAnswer(pollPersonAnswer, {}, {pollQuestionId: this.data.id});
        this._pollPersonAnswers.push(pollPersonAnswer);
      }
    } else {
      let pollPersonAnswer = new PollPersonAnswer();
      if (this._pollPersonAnswers.length) {
        pollPersonAnswer = this._pollPersonAnswers[0];
      }
      pollPersonAnswer.value = this.answerNgxInput.control.value;
      if (this._appHelper.isNewObject(pollPersonAnswer)) {
        pollPersonAnswer = await this._participantRestApiService.createPollPersonAnswer(pollPersonAnswer, {}, {pollQuestionId: this.data.id});
      } else {
        pollPersonAnswer = await this._participantRestApiService.updatePollPersonAnswer(pollPersonAnswer, {}, {pollQuestionId: this.data.id, pollPersonAnswerId: pollPersonAnswer.id});
      }

      this._pollPersonAnswers = [pollPersonAnswer];
    }
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

  public onSelectionChanged(item: PollQuestionAnswer, event: MatCheckboxChange | MatRadioChange): void {
    if (event instanceof MatCheckboxChange) {
      if (event.checked) {
        this.personPollQuestionAnswers.push(item);
      } else {
        this.personPollQuestionAnswers.splice(this.personPollQuestionAnswers.findIndex(x => x.id == item.id), 1);
      }
    } else if (event instanceof MatRadioChange) {
      this.personPollQuestionAnswers = [event.value];
    }
  }

  public isSelected(item: PollQuestionAnswer): boolean {
    return !!this.personPollQuestionAnswers.find(x => x.id == item.id);
  }

  private async pollExecutionInitialize(pollPerson: PollPerson) {
    if (pollPerson) {
      this._pollPersonAnswers = await this._participantRestApiService.getPollPersonAnswers({pollQuestionId: this.data.id, personId: pollPerson.person.id});
      this.personPollQuestionAnswers = this._pollPersonAnswers.map(x => x.pollQuestionAnswer);

      if (this._pollPersonAnswers.length && (this.data.answerTypeEnum === AnswerTypeEnum.FREE_ANSWER || this.data.answerTypeEnum === AnswerTypeEnum.PARAMETERIZED_ANSWER)) {
        this.answerNgxInput.control.setValue(this._pollPersonAnswers[0].value);
      }
    } else {
      this._pollPersonAnswers = [];
      this.personPollQuestionAnswers = [];
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
