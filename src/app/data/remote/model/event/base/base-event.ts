import {EventType} from './event-type';
import {NamedObject} from '../../../base/named-object';
import {EventStateEnum} from './event-state-enum';

export class BaseEvent extends NamedObject {
  public discriminator: EventType;
  public startDate: Date;
  public finishDate: Date;
  public eventStateEnum: EventStateEnum;
}
