import {NamedObject} from '../../../base/named-object';
import {Region} from './region';
import {Type} from 'class-transformer';

export class Area extends NamedObject {

  @Type(() => Region)
  public region?: Region;

}
