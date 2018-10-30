import {IdentifiedObject} from '../base/identified-object';
import {Rank} from './rank';
import {SportType} from './sport-type';

export class PersonRank extends IdentifiedObject {
  rank: Rank;
  sportType: SportType;
  date: Date;
  number: number;
}
