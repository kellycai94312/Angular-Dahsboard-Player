import {Exclude, Type} from 'class-transformer';
import {Testing} from '../model/training/testing/testing';
import {TrainingDiscriminator} from '../model/training/base/training-discriminator';
import {Training} from '../model/training/training/training';
import {Game} from '../model/training/game/game';

export class PageContainer<T> {

  public from: number;
  public size: number;
  public total: number;

  // TODO: Parsing by discriminator
  @Type(options => (options.newObject as PageContainer<T>)._type, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        {value: Testing, name: TrainingDiscriminator.TESTING},
        {value: Training, name: TrainingDiscriminator.TRAINING},
        {value: Game, name: TrainingDiscriminator.GAME}
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
