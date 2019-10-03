import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../../base/identified-object';
import { Group, GROUP_TYPE_OPTIONS } from '../../group/base';
import { Person } from '../../person';
import { NotificationType } from './notification-type';

export class BaseNotification extends IdentifiedObject {

  public discriminator: NotificationType;

  @Type(() => Person)
  public sender: Person;

  @Type(() => Person)
  public receiver: Person;

  @Type(() => Person)
  public person: Person;

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

  public read: boolean;
  public action: boolean;
  public approved: boolean;

}
