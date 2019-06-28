import {Exclude, Type} from 'class-transformer';
import {EventType} from '../model/event/base/event-type';
import {Event} from '../model/event/event';
import {Training} from '../model/event/training';
import {Testing} from '../model/event/testing';
import {Game} from '../model/event/game';
import {Competition} from '../model/event/competition';
import {Relaxation} from '../model/event/relaxation';
import {Diet} from '../model/event/diet';
import {Meeting} from '../model/event/meeting';
import {Education} from '../model/event/education';

export class PageContainer<T> {

  public from: number;
  public size: number;
  public total: number;

  // TODO: Parsing by discriminator
  @Type(options => (options.newObject as PageContainer<T>)._type, {
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
  public list: T[];

  @Exclude()
  private readonly _type: Function;

  constructor(type?: Function) {
    this._type = type;
  }

}
