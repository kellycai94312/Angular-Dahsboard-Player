import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { format } from 'date-fns';
import * as enLocale from 'date-fns/locale/en';
import * as ruLocale from 'date-fns/locale/ru';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { EventDay } from '../../../../data/remote/bean/event/event-day';
import { EventDayHours } from '../../../../data/remote/bean/event/event-day-hours';
import { Locale } from '../../../../data/remote/misc/locale';
import { EventType } from '../../../../data/remote/model/event/base/event-type';
import { Group } from '../../../../data/remote/model/group/base/group';
import { Person } from '../../../../data/remote/model/person';
import { GroupApiService } from '../../../../data/remote/rest-api/api/group/group-api.service';
import { TemplateModalService } from '../../../../service/template-modal.service';
import { EventUtilService } from '../../../../services/event-util/event-util.service';

@Component({
  selector: 'app-group-schedule',
  templateUrl: './group-schedule.component.html',
  styleUrls: ['./group-schedule.component.scss']
})
export class GroupScheduleComponent implements OnInit {

  @Input()
  public group: Group;

  @Input()
  public canEdit: boolean;

  public readonly propertyConstantClass = PropertyConstant;
  public eventDays: EventDay[] = [];
  public weekOffset = 0;

  constructor(private _groupApiService: GroupApiService,
              private _translateService: TranslateService,
              private _templateModalService: TemplateModalService,
              private _eventUtilService: EventUtilService) {
  }

  public ngOnInit(): void {
    this._updateTable();
  }

  public get startWeekDay(): Date {
    return this.eventDays[0].date;
  }

  public get finishWeekDay(): Date {
    return this.eventDays[this.eventDays.length - 1].date;
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
