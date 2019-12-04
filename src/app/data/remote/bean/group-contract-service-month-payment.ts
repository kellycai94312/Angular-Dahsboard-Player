import { GroupContractService } from 'app/data/remote/model/group/contract';
import { Type } from 'class-transformer';

export class GroupContractServiceMonthPayment {

  @Type(() => GroupContractService)
  public groupContractService: GroupContractService;

  public sumInKopeks: number;

}
