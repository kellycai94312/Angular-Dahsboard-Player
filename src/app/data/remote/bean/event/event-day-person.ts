import {Person} from '../../model/person';
import {EventDayHours} from './event-day-hours';
import {Type} from 'class-transformer';

export class EventDayPerson {

  @Type(() => Person)
  public person: Person;

  @Type(() => EventDayHours)
  public eventDayHours: EventDayHours[];

}
