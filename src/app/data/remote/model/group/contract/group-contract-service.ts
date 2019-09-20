import { BaseGroupContract } from './base-group-contract';
import { GroupContractType } from './group-contract-type';

export class GroupContractService extends BaseGroupContract {
  public workPlace: string;
  public course: string;
  // Услуги платные
  public paidService: boolean;
  // Стоимость занятий в месяц
  public pricePerMonth: number;
  // Количество занятий в месяц
  public classesPerMonth: number;
  // Количество занятий в неделю
  public classesPerWeek: number;
  // Продолжительность занятий
  public classDuration: number;
  // Адрес регистрации
  public registrationAddress: string;
  // Кружок/секция
  public section: string;
  // Руководитель/специалист
  public head: string;

  constructor() {
    super();
    this.discriminator = GroupContractType.SERVICE;
  }
}
