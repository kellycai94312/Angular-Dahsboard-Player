import {IdentifiedObject} from '../../../base/identified-object';
import {BaseEvent} from '../base/base-event';
import {Person} from '../../person';
import {Type} from 'class-transformer';
import {Event} from '../event';
import {EventType} from '../base/event-type';
import {Training} from '../training';
import {Testing} from '../testing';
import {Game} from '../game';
import {Competition} from '../competition';
import {Relaxation} from '../relaxation';
import {Diet} from '../diet';
import {MeetUp} from '../meet-up';
import {Tuition} from '../tuition';

export class EventPerson extends IdentifiedObject {

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
        {value: MeetUp, name: EventType.MEET_UP},
        {value: Tuition, name: EventType.TUITION}
      ],
    },
    keepDiscriminatorProperty: true
  })
  public event: BaseEvent;

  @Type(type => Person)
  public person: Person;

}
