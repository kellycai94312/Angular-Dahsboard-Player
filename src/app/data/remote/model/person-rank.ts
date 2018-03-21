import { IdentifiedObject } from '../base/identified-object';
import { Rank } from './rank';

export class PersonRank extends IdentifiedObject {
  rank: Rank;
  assignee: string;
  date: Date;
  orderNumber: string;
  certificateNumber: string;
}
