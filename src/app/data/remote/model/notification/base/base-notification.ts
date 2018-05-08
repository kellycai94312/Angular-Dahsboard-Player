import {IdentifiedObject} from '../../../base/identified-object';
import {Person} from '../../person';
import {Group} from '../../group/base/group';
import {NotificationType} from './notification-type';

export class BaseNotification extends IdentifiedObject {
  public discriminator: NotificationType;
  public sender: Person;
  public receiver: Person;
  public person: Person;
  public group: Group;
  public read: boolean;
  public action: boolean;
  public approved: boolean;
}
