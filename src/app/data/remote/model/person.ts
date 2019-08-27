import {SexEnum} from '../misc/sex-enum';
import {Address} from './address';
import {IdentifiedObject} from '../base/identified-object';
import {User} from './user';
import {AthleteState} from './person/athlete-state';
import {GroupPersonJob} from './group/group-person-job';
import {Type} from 'class-transformer';

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
