import {Component} from '@angular/core';
import {Testing} from '../../../../../../data/remote/model/training/testing/testing';
import {EventService} from '../../../service/event.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {Tab} from '../../../../../../data/local/tab';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {BaseEventStepComponent} from '../../../../../../data/local/component/base/base-event-step-component';

// TODO: Remove this
// @Component({
//   selector: 'app-testing-steps-manager',
//   templateUrl: './testing-steps-manager.component.html',
//   styleUrls: ['./testing-steps-manager.component.scss']
// })
export class TestingStepsManagerComponent extends BaseEventStepComponent<Testing> {

  public tabs: Tab[];

  constructor(eventService: EventService<Testing>, participantRestApiService: ParticipantRestApiService, appHelper: AppHelper) {
    super(eventService, participantRestApiService, appHelper);
    this.tabs = [
      {nameKey: 'general', routerLink: '1'}
    ];
  }

  public onTabChange(val: Tab) {
    this.eventService.tabSubject.next(val);
  }

}
