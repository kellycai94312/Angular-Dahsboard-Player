import {EventDayPerson} from './event-day-person';
import {Type} from 'class-transformer';

export class EventDay {

  public date: Date;

  @Type(() => EventDayPerson)
  public eventDayPersons: EventDayPerson[];

}
