import {NamedObject} from '../../base/named-object';
import {Poll} from './poll';
import {Type} from 'class-transformer';

export class PollVersion extends NamedObject {

  @Type(() => Poll)
  public poll: Poll;

  public versionNumber: number;

}
