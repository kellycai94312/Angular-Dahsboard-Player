import {NamedObject} from '../../base/named-object';
import {StageEnum} from './stage-enum';

export class Stage extends NamedObject {
  public stageEnum: StageEnum;
  public minDuration: number;
  public maxDuration: number;
}
