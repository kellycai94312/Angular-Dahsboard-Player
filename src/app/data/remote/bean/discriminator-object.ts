import {Exclude, Type} from 'class-transformer';
import {Event} from '../model/event/event';
import {EventType} from '../model/event/base/event-type';
import {Training} from '../model/event/training';
import {Testing} from '../model/event/testing';
import {Game} from '../model/event/game';
import {Competition} from '../model/event/competition';
import {Relaxation} from '../model/event/relaxation';
import {Diet} from '../model/event/diet';
import {MeetUp} from '../model/event/meet-up';
import {Tuition} from '../model/event/tuition';


export class DiscriminatorObject {

  // TODO: Parsing by discriminator
  @Type(options => (options.newObject as DiscriminatorObject)._type, {
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
  public obj: any;

  @Exclude()
  private readonly _type: Function;

  constructor(type: Function) {
    this._type = type;
  }

}
