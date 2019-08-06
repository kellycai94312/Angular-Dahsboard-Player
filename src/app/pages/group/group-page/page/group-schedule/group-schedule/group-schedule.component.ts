import {Component} from '@angular/core';
import {BaseGroupComponent} from '../../../../../../data/local/component/group/base-group-component';
import {Group} from '../../../../../../data/remote/model/group/base/group';
import {GroupService} from '../../../service/group.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {GroupApiService} from '../../../../../../data/remote/rest-api/api/group/group-api.service';
import {EventDay} from '../../../../../../data/remote/bean/event/event-day';
import {Person} from '../../../../../../data/remote/model/person';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {EventDayHours} from '../../../../../../data/remote/bean/event/event-day-hours';
import * as ruLocale from 'date-fns/locale/ru';
import * as enLocale from 'date-fns/locale/en';
import {format} from 'date-fns';
import {TranslateService} from '@ngx-translate/core';
import {Locale} from '../../../../../../data/remote/misc/locale';
import {TemplateModalService} from '../../../../../../service/template-modal.service';
import {EventUtilService} from '../../../../../../services/event-util/event-util.service';
import {EventType} from '../../../../../../data/remote/model/event/base/event-type';

@Component({
  selector: 'app-group-schedule',
  templateUrl: './group-schedule.component.html',
  styleUrls: ['./group-schedule.component.scss']
})
export class GroupScheduleComponent extends BaseGroupComponent<Group> {

  public readonly propertyConstantClass = PropertyConstant;
  public eventDays: EventDay[] = [];
  public weekOffset = 0;

  constructor(private _groupApiService: GroupApiService,
              private _translateService: TranslateService,
              private _templateModalService: TemplateModalService,
              private _eventUtilService: EventUtilService,
              groupService: GroupService, appHelper: AppHelper) {
    super(groupService, appHelper);
  }

  public get canGetPrevious(): boolean {
    return this.weekOffset > 0;
  }

  public get startWeekDay(): Date {
    return this.eventDays[0].date;
  }

  public get finishWeekDay(): Date {
    return this.eventDays[this.eventDays.length - 1].date;
  }

  async initializeGroup(group: Group): Promise<void> {
    await super.initializeGroup(group);
    this._updateTable();
  }

  public getRows(): Person[] {
    const items: Person[] = [];
    for (const eventDay of this.eventDays) {
      for (const eventDayPerson of eventDay.eventDayPersons) {
        if (!items.find(x => x.id == eventDayPerson.person.id)) {
          items.push(eventDayPerson.person);
        }
      }
    }
    return items;
  }

  public getCellData(eventDay: EventDay, person: Person): EventDayHours[] {
    const eventDayPerson = eventDay.eventDayPersons.find(x => x.person.id == person.id);
    if (eventDayPerson) {
      return eventDayPerson.eventDayHours;
    }
    return [];
  }

  public getDayName(date: Date): string {
    return format(date, 'dd', {locale: this._translateService.defaultLang === Locale.en ? enLocale : ruLocale}).toLowerCase();
  }

  public async onAddEvent(): Promise<void> {
    const event = this._eventUtilService.getDefaultEvent(new Date(), EventType.TRAINING);
    const dialogResult = await this._templateModalService.showEditBaseEvent(event);
    if (dialogResult.result) {
      this._updateTable();
    }
  }

  public onPrevious(): void {
    this.weekOffset--;
    this._updateTable();
  }

  public onNext(): void {
    this.weekOffset++;
    this._updateTable();
  }

  private _updateTable(): void {
    this.eventDays = [];
    this._groupApiService.getGroupSchedule(this.group, {weekOffset: this.weekOffset}).subscribe(value => {
      this.eventDays = value;
    });
  }

}
