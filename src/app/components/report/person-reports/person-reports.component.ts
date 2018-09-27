import {Component, Input, ViewChild} from '@angular/core';
import {BaseTraining} from '../../../data/remote/model/training/base/base-training';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {TrainingPerson} from '../../../data/remote/model/training/training-person';
import {PropertyConstant} from '../../../data/local/property-constant';
import {NameWrapper} from '../../../data/local/name-wrapper';
import {ReportsComponent} from '../reports/reports.component';
import {UserRoleEnum} from '../../../data/remote/model/user-role-enum';

@Component({
  selector: 'app-person-reports',
  templateUrl: './person-reports.component.html',
  styleUrls: ['./person-reports.component.scss']
})
export class PersonReportsComponent {

  @ViewChild(ReportsComponent)
  public reportsComponent: ReportsComponent;

  @Input()
  public event: BaseTraining;

  public eventPersons: NameWrapper<TrainingPerson>[];
  public selectedEventPerson: NameWrapper<TrainingPerson>;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
  }

  public async initialize(event: BaseTraining): Promise<void> {
    this.event = event;
    this.eventPersons = (await this._participantRestApiService.getTrainingPersons({}, {
      count: PropertyConstant.pageSizeMax,
      unassigned: false,
      userRole: UserRoleEnum.ATHLETE
    }, {baseTrainingId: event.id})).list.map(x => {
      const nameWrapper = new NameWrapper<TrainingPerson>();
      nameWrapper.data = x;
      nameWrapper.name = `${x.person.firstName} ${x.person.lastName}`;
      return nameWrapper;
    });
    if (this.eventPersons.length) {
      this.selectedEventPerson = this.eventPersons[0];
      this.onEventPersonChanged(this.selectedEventPerson);
    }
  }

  public onEventPersonChanged(nameWrapper: NameWrapper<TrainingPerson>) {
    this.reportsComponent.initialize(nameWrapper.data);
  }

}
