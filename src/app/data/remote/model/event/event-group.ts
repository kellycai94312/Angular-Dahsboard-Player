import { Type } from 'class-transformer';
import { IdentifiedObject } from '../../base/identified-object';
import { Group, GROUP_TYPE_OPTIONS } from '../group/base';
import { BaseEvent, EVENT_TYPE_OPTIONS } from './base';

export class EventGroup extends IdentifiedObject {

  @Type(() => BaseEvent, EVENT_TYPE_OPTIONS)
  public event: BaseEvent;

  @Type(() => Group, GROUP_TYPE_OPTIONS)
  public group: Group;

}
