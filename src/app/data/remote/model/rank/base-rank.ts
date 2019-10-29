import { NamedObject } from 'app/data/remote/base';
import { RankType } from './rank-type';

export class BaseRank extends NamedObject {
  public discriminator: RankType;
}
