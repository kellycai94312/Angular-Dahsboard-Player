import {NamedObject} from '../../../../base/named-object';
import {TrainingBlockType} from './training-block-type';
import {TrainingDiscriminator} from '../../base/training-discriminator';
import {SportType} from '../../../sport-type';
import {Location} from '../../../location';
import {TrainingReport} from './training-report';

export class BaseTrainingBlock extends NamedObject {
  public discriminator: TrainingBlockType;
  public dateFrom: Date;
  public dateTo: Date;
  public trainingType: TrainingDiscriminator;
  public sportType: SportType;
  public location: Location;
  public trainingReport: TrainingReport;
}
