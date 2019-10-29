import { IdentifiedObject } from 'app/data/remote/base';
import { BaseRank, RANK_TYPE_OPTIONS } from 'app/data/remote/model/rank';
import { SportType } from 'app/data/remote/model/sport-type';
import { Type } from 'class-transformer';

export class PersonRank extends IdentifiedObject {

  @Type(() => BaseRank, RANK_TYPE_OPTIONS)
  public rank: BaseRank;

  @Type(() => SportType)
  public sportType: SportType;

  @Type(() => Date)
  public date: Date;

  public number: number;

}
