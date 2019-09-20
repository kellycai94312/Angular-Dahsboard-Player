import { BaseGroupContract } from './base-group-contract';
import { GroupContractType } from './group-contract-type';
import { TariffRateEnum } from './tariff-rate-enum';

export class GroupContractJob extends BaseGroupContract {
  public tariffRateEnum: TariffRateEnum;
  public dailyRate?: number;

  constructor() {
    super();
    this.discriminator = GroupContractType.JOB;
  }
}
