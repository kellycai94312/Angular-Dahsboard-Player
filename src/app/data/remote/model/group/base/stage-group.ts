import { SportType } from 'app/data/remote/model/sport-type';
import { Stage } from 'app/data/remote/model/stage/stage';
import { Type } from 'class-transformer';
import { Group } from './group';

export class StageGroup extends Group {

  @Type(() => SportType)
  public sportType: SportType;

  @Type(() => Stage)
  public stage: Stage;

  public stageYear: number;

}
