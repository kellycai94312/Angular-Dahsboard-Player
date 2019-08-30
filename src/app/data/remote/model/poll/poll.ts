import {NamedObject} from '../../base/named-object';
import {PollTypeEnum} from './poll-type-enum';

export class Poll extends NamedObject {
  public pollTypeEnum: PollTypeEnum;
  public pollVersionId: number;
}
