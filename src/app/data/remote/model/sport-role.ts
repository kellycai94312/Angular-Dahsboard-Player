import { NamedObject } from '../base/named-object';
import { SportType } from './sport-type';

export class SportRole extends NamedObject {
  public sportType: SportType;
  public shortName: string;
}
