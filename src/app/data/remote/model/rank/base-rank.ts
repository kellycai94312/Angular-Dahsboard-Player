import { NamedObject } from 'app/data/remote/base';
import { ClaimState } from 'app/data/remote/model/claim-state';
import { Type } from 'class-transformer';
import { RankType } from './rank-type';

export class BaseRank extends NamedObject {

  public discriminator: RankType;

  @Type(() => ClaimState)
  public claimState: ClaimState;

}
