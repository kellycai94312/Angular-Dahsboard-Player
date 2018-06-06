import {Injectable} from '@angular/core';
import {TrainingDiscriminator} from '../../../../data/remote/model/training/base/training-discriminator';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';

const eventColors: any = {
  training: {
    primary: '#ffdc00',
    secondary: '#ffdc00',
    font: '#444'
  },
  testing: {
    primary: '#1e90ff',
    secondary: '#1e90ff',
    font: '#eee'
  },
  game: {
    primary: '#2ab73a',
    secondary: '#2ab73a',
    font: '#eee'
  }
};

@Injectable()
export class EventsCalendarService {

  constructor() {
  }

  public getTrainingColor(event: BaseTraining) {
    switch (event.discriminator) {
      case TrainingDiscriminator.TESTING:
        return eventColors.testing;
      case TrainingDiscriminator.TRAINING:
        return eventColors.training;
      case TrainingDiscriminator.GAME:
        return eventColors.game;
    }
  }

}
