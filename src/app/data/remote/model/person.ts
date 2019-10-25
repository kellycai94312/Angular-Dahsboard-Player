import { IdentifiedObject } from 'app/data/remote/base';
import { SexEnum } from 'app/data/remote/misc/sex-enum';
import { GroupPersonJob } from 'app/data/remote/model/group/person/group-person-job';
import { AthleteState } from 'app/data/remote/model/person/athlete-state';
import { Type } from 'class-transformer';
import { Address } from './address';
import { User } from './user';

export class Person extends IdentifiedObject {

  public firstName: string;
  public lastName: string;
  public patronymic: string;
  public birthDate: Date;
  public sex: SexEnum;
  public countryCode: string;
  public phoneNumber: string;

  @Type(() => Address)
  public address: Address;

  public user: User;
  public athleteState: AthleteState;
  public legalRepresentativesPhone: string;
  public athleteId: string;
  public federationAthleteId: string;
  public description: string;

  //region Transient

  public connected: boolean;

  @Type(() => GroupPersonJob)
  public groupPersonJob: GroupPersonJob;

  //endregion
}
