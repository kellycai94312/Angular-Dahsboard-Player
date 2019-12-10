import { SubgroupPerson } from 'app/data/remote/model/group/subgroup/person/subgroup-person';
import { SubgroupGroup } from 'app/data/remote/model/group/subgroup/subgroup/subgroup-group';
import { Type } from 'class-transformer';
import { BaseGroupContract } from './base-group-contract';
import { GroupContractType } from './group-contract-type';

export class GroupContractService extends BaseGroupContract {

  public workplace: string;
  public course: string;
  // Услуги платные
  public paidService: boolean;
  // Стоимость занятий в месяц
  public pricePerMonthInKopeks: number;
  // Количество занятий в месяц
  public classesPerMonth: number;
  // Количество занятий в неделю
  public classesPerWeek: number;
  // Продолжительность занятий
  public classDuration: number;
  // Адрес регистрации
  public registrationAddress: string;

  // Кружок/секция
  @Type(() => SubgroupGroup)
  public subgroupGroup: SubgroupGroup;

  @Type(() => SubgroupPerson)
  public subgroupPerson: SubgroupPerson;

  public enabled: boolean;

  constructor() {
    super();
    this.discriminator = GroupContractType.SERVICE;
  }

}
