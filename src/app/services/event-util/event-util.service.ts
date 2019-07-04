import {Injectable} from '@angular/core';
import {EventType} from '../../data/remote/model/event/base/event-type';
import {BaseEvent} from '../../data/remote/model/event/base/base-event';
import {EventStateEnum} from '../../data/remote/model/event/base/event-state-enum';
import {Event} from '../../data/remote/model/event/event';
import {Training} from '../../data/remote/model/event/training';
import {Testing} from '../../data/remote/model/event/testing';
import {Game} from '../../data/remote/model/event/game';
import {Competition} from '../../data/remote/model/event/competition';
import {Relaxation} from '../../data/remote/model/event/relaxation';
import {Diet} from '../../data/remote/model/event/diet';
import {Meeting} from '../../data/remote/model/event/meeting';
import {Education} from '../../data/remote/model/event/education';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class EventUtilService {

  public readonly defaultDurationMs = 30 * 60 * 1000;

  constructor(private _translateService: TranslateService) {
  }

  public getDefaultEventName(eventType: EventType): string {
    return this._translateService.instant(`eventTypeEnum.${eventType}`);
  }

  public getEventColor(eventType: EventType): any {
    switch (eventType) {
      case EventType.EVENT:
        return {primary: '#cccccc', secondary: '#cccccc', font: '#eee'};
      case EventType.TRAINING:
        return {primary: '#04ffeb', secondary: '#04ffeb', font: '#eee'};
      case EventType.TESTING:
        return {primary: '#ffdc00', secondary: '#ffdc00', font: '#eee'};
      case EventType.GAME:
        return {primary: '#b7a631', secondary: '#b7a631', font: '#eee'};
      case EventType.COMPETITION:
        return {primary: '#ff0000', secondary: '#ff0000', font: '#eee'};
      case EventType.RELAXATION:
        return {primary: '#0000ff', secondary: '#0000ff', font: '#eee'};
      case EventType.DIET:
        return {primary: '#2ab73a', secondary: '#2ab73a', font: '#eee'};
      case EventType.MEETING:
        return {primary: '#b700b5', secondary: '#b700b5', font: '#eee'};
      case EventType.EDUCATION:
        return {primary: '#b77422', secondary: '#b77422', font: '#eee'};
    }
    return void 0;
  }

  public getDefaultEvent<T extends BaseEvent>(startDate: Date, eventType: EventType): T {
    const event = this.getEventInstance(eventType);
    event.name = this.getDefaultEventName(eventType);
    event.startDate = startDate;
    event.finishDate = new Date(startDate.getTime() + this.defaultDurationMs);
    event.eventStateEnum = EventStateEnum.DRAFT;
    return event as T;
  }

  public getEventInstance(eventType: EventType): BaseEvent {
    switch (eventType) {
      case EventType.EVENT:
        return new Event;
      case EventType.TRAINING:
        return new Training();
      case EventType.TESTING:
        return new Testing();
      case EventType.GAME:
        return new Game();
      case EventType.COMPETITION:
        return new Competition();
      case EventType.RELAXATION:
        return new Relaxation();
      case EventType.DIET:
        return new Diet();
      case EventType.MEETING:
        return new Meeting();
      case EventType.EDUCATION:
        return new Education();
    }
    return void 0;
  }

}
