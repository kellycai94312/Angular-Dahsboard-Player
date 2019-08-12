import {Component, Input} from '@angular/core';
import {SelectionType} from '../../../../components/ngx-grid/bean/selection-type';
import {BaseEventApiService} from '../../../../data/remote/rest-api/api/event/base-event-api/base-event-api.service';
import {BaseEvent} from '../../../../data/remote/model/event/base/base-event';
import {Person} from '../../../../data/remote/model/person';
import {EventPersonTypeEnum} from '../../../../data/remote/model/event/person/event-person-type-enum';
import {EventPersonQuery} from '../../../../data/remote/rest-api/query/event/event-person-query';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-event-attendance',
  templateUrl: './event-attendance.component.html',
  styleUrls: ['./event-attendance.component.scss']
})
export class EventAttendanceComponent {

  @Input()
  public event: BaseEvent;

  public readonly selectionTypeClass = SelectionType;
  public isBusyPersonParticipants: boolean;
  public isBusyPersonHeads: boolean;

  constructor(private _baseEventApiService: BaseEventApiService,
              private _appHelper: AppHelper) {
  }

  public onSelectedItemChange(item: { value: Person, selected: boolean }): void {
    this._baseEventApiService.updateEventPersonAbsent(this.event, item.value, {value: item.selected}).subscribe(value => {
      value.person['selected'] = value.absent;
      Object.assign(item.value, value.person);
    });
  }

  public fetchHeads = async (query: EventPersonQuery) => {
    this.isBusyPersonHeads = true;
    query.unassigned = false;
    query.eventPersonTypeEnum = EventPersonTypeEnum.HEAD;
    const pageContainer = await this._appHelper.pageContainerConverter(await this._baseEventApiService.getEventPersons(this.event, query).toPromise(), obj => {
      if (obj.absent) {
        obj.person['selected'] = true;
      }
      return obj.person;
    });
    delete this.isBusyPersonHeads;

    return pageContainer;
  };

  public fetchParticipants = async (query: EventPersonQuery) => {
    this.isBusyPersonParticipants = true;
    query.unassigned = false;
    query.eventPersonTypeEnum = EventPersonTypeEnum.PARTICIPANT;
    const pageContainer = await this._appHelper.pageContainerConverter(await this._baseEventApiService.getEventPersons(this.event, query).toPromise(), obj => {
      if (obj.absent) {
        obj.person['selected'] = true;
      }
      return obj.person;
    });
    delete this.isBusyPersonParticipants;

    return pageContainer;
  };

}
