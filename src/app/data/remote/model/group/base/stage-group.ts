import { Type } from 'class-transformer';
import { SportType } from '../../sport-type';
import { Stage } from '../../stage/stage';
import { Group } from './group';

export class StageGroup extends Group {

  @Type(() => SportType)
  public sportType: SportType;

  @Type(() => Stage)
  public stage: Stage;

  public stageYear: number;

}
