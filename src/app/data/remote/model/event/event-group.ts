import {IdentifiedObject} from '../../base/identified-object';
import {BaseEvent} from './base/base-event';
import {Group} from '../group/base/group';
import {Type} from 'class-transformer';
import {Event} from './event';
import {EventType} from './base/event-type';
import {Training} from './training';
import {Testing} from './testing';
import {Game} from './game';
import {Competition} from './competition';
import {Relaxation} from './relaxation';
import {Diet} from './diet';
import {Meeting} from './meeting';
import {Education} from './education';

export class EventGroup extends IdentifiedObject {

  @Type(options => BaseEvent, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        {value: Event, name: EventType.EVENT},
        {value: Training, name: EventType.TRAINING},
        {value: Testing, name: EventType.TESTING},
        {value: Game, name: EventType.GAME},
        {value: Competition, name: EventType.COMPETITION},
        {value: Relaxation, name: EventType.RELAXATION},
        {value: Diet, name: EventType.DIET},
        {value: Meeting, name: EventType.MEETING},
        {value: Education, name: EventType.EDUCATION}
      ],
    },
    keepDiscriminatorProperty: true
  })
  public event: BaseEvent;

  @Type(type => Group)
  public group: Group;

}
