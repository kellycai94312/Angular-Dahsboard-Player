import {IdentifiedObject} from '../../../base/identified-object';
import {Person} from '../../person';
import {Group} from '../../group/base/group';
import {NotificationType} from './notification-type';
import {Type} from 'class-transformer';

export class BaseNotification extends IdentifiedObject {

  public discriminator: NotificationType;

  @Type(() => Person)
  public sender: Person;

  @Type(() => Person)
  public receiver: Person;

  @Type(() => Person)
  public person: Person;

  @Type(() => Group)
  public group: Group;

  public read: boolean;
  public action: boolean;
  public approved: boolean;

}
