import {StageEnum} from './stage-enum';
import {ShortNameObject} from '../../base/short-name-object';

export class Stage extends ShortNameObject {
  public stageEnum: StageEnum;
  public minDuration: number;
  public maxDuration: number;
}
