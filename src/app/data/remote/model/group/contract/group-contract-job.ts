import {BaseGroupContract} from './base-group-contract';
import {TariffRateEnum} from './tariff-rate-enum';
import {GroupContractType} from './group-contract-type';

export class GroupContractJob extends BaseGroupContract {
  public tariffRateEnum: TariffRateEnum;
  public dailyRate: number;

  constructor() {
    super();
    this.discriminator = GroupContractType.JOB;
  }
}
