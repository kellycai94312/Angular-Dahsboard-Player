import {Component, ComponentFactoryResolver, Input, OnDestroy} from '@angular/core';
import {BaseEditComponent} from '../../../../data/local/component/base/base-edit-component';
import {EventPoll} from '../../../../data/remote/model/training/poll/event-poll';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {Validators} from '@angular/forms';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {EditPollQuestionComponent} from '../../edit-poll-question/edit-poll-question/edit-poll-question.component';
import {PollQuestion} from '../../../../data/remote/model/training/poll/poll-question';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {Person} from '../../../../data/remote/model/person';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-edit-event-poll',
  templateUrl: './edit-event-poll.component.html',
  styleUrls: ['./edit-event-poll.component.scss']
})
export class EditEventPollComponent extends BaseEditComponent<EventPoll> implements OnDestroy {

  @Input()
  public event: BaseTraining;

  public nameNgxInput: NgxInput;
  public pollQuestions: PollQuestion[] = [];
  private _person: Person;
  private _notDestroyed = true;

  constructor(private _ngxModalService: NgxModalService,
              private _authorizationService: AuthorizationService,
              private _componentFactoryResolver: ComponentFactoryResolver,
              participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(participantRestApiService, appHelper);
    this._authorizationService.personSubject
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(value => {
        this._person = value;
      });
  }

  public ngOnDestroy(): void {
    this._notDestroyed = false;
  }

  protected async initializeComponent(data: EventPoll): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this.appHelper.tryLoad(async () => {
        this.nameNgxInput = new NgxInput();
        this.nameNgxInput.labelTranslation = 'name';
        this.nameNgxInput.required = true;
        this.nameNgxInput.control.setValue(this.data.name);
        this.nameNgxInput.control.setValidators([Validators.required]);

        if (!this.isNew) {
          if (data.approved) {
            this.nameNgxInput.control.disable();
          }
          this.pollQuestions = await this.participantRestApiService.getPollQuestions({}, {}, {eventPollId: this.data.id});
        }
      });
    }
    return result;
  }

  public async onRemove(): Promise<boolean> {
    return await this.appHelper.tryRemove(async () => {
      this.data = await this.participantRestApiService.removeEventPoll({eventPollId: this.data.id});
    });
  }

  public async onSave(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data.name = this.nameNgxInput.control.value;

      if (this.isNew) {
        this.data = await this.participantRestApiService.createEventPoll(this.data, {}, {eventId: this.event.id});
      } else {
        this.data = await this.participantRestApiService.updateEventPoll(this.data, {}, {eventPollId: this.data.id});
      }
    });
  }

  public get canEdit(): boolean {
    return !this.canExecutePoll && ((this.data && !this.data.id) || (this._person && this.data.owner.id == this._person.user.id));
  }

  public get canExecutePoll(): boolean {
    return !!(this.data && this.data.approved);
  }

  public async onApprove(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      this.data = await this.participantRestApiService.approveEventPoll({}, {}, {eventPollId: this.data.id});

    });
  }

  public async onAddPollQuestion(): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      if (this.isNew) {
        await this.onSave();
      }
      await this.showEditPollQuestion(new PollQuestion());
    }, false);
  }

  public async onEditPollQuestion(item: PollQuestion): Promise<boolean> {
    return await this.appHelper.trySave(async () => {
      await this.showEditPollQuestion(item);
    }, false);
  }

  private async showEditPollQuestion(obj: PollQuestion): Promise<boolean> {
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'edit';
    await modal.componentInstance.initializeBody(EditPollQuestionComponent, async component => {
      component.eventPoll = this.data;
      await component.initialize(this.appHelper.cloneObject(obj));

      modal.componentInstance.splitButtonItems = [
        this._ngxModalService.saveSplitItemButton(async () => {
          if (await this._ngxModalService.save(modal, component)) {
            const index = this.pollQuestions.indexOf(obj);
            if (index < 0) {
              this.pollQuestions.push(component.data);
            } else {
              this.pollQuestions[index] = component.data;
            }
          }
        }),
        this._ngxModalService.removeSplitItemButton(async () => {
          if (await this._ngxModalService.remove(modal, component)) {
            this.pollQuestions.splice(this.pollQuestions.indexOf(obj), 1);
          }
        })
      ];
    }, {componentFactoryResolver: this._componentFactoryResolver});
    return await this._ngxModalService.awaitModalResult(modal);
  }

}
