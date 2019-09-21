import { ShortNameObject } from '../../base/short-name-object';
import { StageEnum } from './stage-enum';

export class Stage extends ShortNameObject {
  public stageEnum: StageEnum;
  public minDuration: number;
  public maxDuration: number;
}
