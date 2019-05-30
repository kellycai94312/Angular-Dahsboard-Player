import {EventType} from './event-type';
import {NamedObject} from '../../../base/named-object';

export class BaseEvent extends NamedObject {
  public discriminator: EventType;
  public startDate: Date;
  public finishDate: Date;
}
