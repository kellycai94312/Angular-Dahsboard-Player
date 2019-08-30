import {Component, Input} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {PollQuestion} from '../../../../data/remote/model/poll/poll-question';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {Validators} from '@angular/forms';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {AnswerTypeEnum} from '../../../../data/remote/model/poll/answer-type-enum';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {NgxSelect} from '../../../ngx/ngx-select/model/ngx-select';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {Poll} from '../../../../data/remote/model/poll/poll';
import {PollApiService} from '../../../../data/remote/rest-api/api/poll/poll-api.service';
import {ValidationService} from '../../../../service/validation/validation.service';

@Component({
  selector: 'app-edit-poll-question',
  templateUrl: './edit-poll-question.component.html',
  styleUrls: ['./edit-poll-question.component.scss']
})
export class EditPollQuestionComponent extends BaseEditComponent<PollQuestion> {

  @Input()
  public poll: Poll;

  public questionNgxInput: NgxInput;
  public answerTypeNgxSelect: NgxSelect;
  // public parameterTypeNgxSelect: NgxSelect
  public orderNgxInput: NgxInput;
  public answerTypeNameWrappers: NameWrapper<AnswerTypeEnum>[] = [];
  public selectedAnswerTypeNameWrapper: NameWrapper<AnswerTypeEnum>;

  constructor(private _translateObjectService: TranslateObjectService,
              private _pollApiService: PollApiService,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
  }

  protected async initializeComponent(data: PollQuestion): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.questionNgxInput = new NgxInput();
        this.questionNgxInput.type = NgxInputType.TEXTAREA;
        this.questionNgxInput.labelTranslation = 'question';
        this.questionNgxInput.required = true;
        this.questionNgxInput.control.setValue(this.data.name);
        this.questionNgxInput.control.setValidators([Validators.required]);

        this.answerTypeNameWrappers = (await this._translateObjectService.getTranslatedEnumCollection<AnswerTypeEnum>(AnswerTypeEnum, 'AnswerTypeEnum')).filter(value => value.data !== AnswerTypeEnum.FREE_ANSWER);
        this.selectedAnswerTypeNameWrapper = this.isNew ? this.answerTypeNameWrappers[0] : this.answerTypeNameWrappers.find(x => x.data === this.data.answerTypeEnum);

        this.answerTypeNgxSelect = new NgxSelect();
        this.answerTypeNgxSelect.labelTranslation = 'answerType';
        this.answerTypeNgxSelect.required = true;
        this.answerTypeNgxSelect.items = this.answerTypeNameWrappers;
        this.answerTypeNgxSelect.display = 'name';
        this.answerTypeNgxSelect.control.setValue(this.selectedAnswerTypeNameWrapper);
        this.answerTypeNgxSelect.control.setValidators([Validators.required]);

        this.orderNgxInput = new NgxInput();
        this.orderNgxInput.labelTranslation = 'order';
        this.orderNgxInput.control.setValue(this.data.order);
        this.orderNgxInput.control.setValidators([ValidationService.integerValidator]);

        if (!this.isNew) {
          this.answerTypeNgxSelect.control.disable({});
        }
        // TODO: Load measures if answerTypeEnum.PARAMETERIZED_ANSWER
        // const measures = (await this.participantRestApiService.getMeasures({count: PropertyConstant.pageSizeMax})).list;
        // this.parameterTypeNgxSelect = new NgxSelect();
        // this.parameterTypeNgxSelect.labelTranslation = 'parameter';
        // this.parameterTypeNgxSelect.required = true;
        // this.parameterTypeNgxSelect.items = measures;
        // this.parameterTypeNgxSelect.display = (item: Measure): string => {
        //   return `${item.measureParameter.name} (${item.measureUnit.name})`;
        // };
        // this.parameterTypeNgxSelect.control.setValue(data.measure);
        // this.parameterTypeNgxSelect.control.setValidators([Validators.required]);
      });
    }
    return result;
  }

  async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this._pollApiService.removePollQuestion(this.poll, this.data).toPromise();
    });
  }

  async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.name = this.questionNgxInput.control.value;
      this.data.answerTypeEnum = this.answerTypeNgxSelect.control.value.data;
      // TODO: this.data.measure = this.parameterTypeNgxSelect.control.value;
      this.data.order = this.orderNgxInput.control.value;

      this.data = await this._pollApiService.savePollQuestion(this.poll, this.data).toPromise();
    });
  }

}
