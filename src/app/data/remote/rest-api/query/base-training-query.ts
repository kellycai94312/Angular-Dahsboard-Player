import {PageQuery} from '../page-query';
import {TrainingState} from '../../misc/training-state';
import {TrainingDiscriminator} from '../../model/training/base/training-discriminator';

export class BaseTrainingQuery extends PageQuery {
  public template?: boolean;
  public state?: TrainingState;
  public discriminator?: TrainingDiscriminator;
  public measureParameter?: string;
  public locationId?: number;
  public dateFrom?: Date;
  public dateTo?: Date;
}
