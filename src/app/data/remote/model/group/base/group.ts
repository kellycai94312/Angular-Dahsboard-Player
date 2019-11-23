import { NamedObject } from 'app/data/remote/base';
import { Activity } from 'app/data/remote/model/activity/activity';
import { BaseAddress } from 'app/data/remote/model/address/base/base-address';
import { PlainAddress } from 'app/data/remote/model/address/plain-address';
import { GroupAdditionalInformation, GroupClaimStateEnum, GroupRequisites } from 'app/data/remote/model/group';
import { Person } from 'app/data/remote/model/person';
import { Type } from 'class-transformer';
import { GroupPersonTypeStateEnum } from '../person';
import { GroupTypeEnum } from './group-type-enum';

export class Group extends NamedObject {

  public discriminator: GroupTypeEnum;

  @Type(() => BaseAddress)
  public address?: BaseAddress;

  @Type(() => PlainAddress)
  public legalAddress?: PlainAddress;

  @Type(() => Activity)
  public activity: Activity;

  @Type(() => Person)
  public head?: Person;

  public approved?: boolean;
  public visible?: boolean;
  public fullName?: string;
  public shortName?: string;
  public phone?: string;
  public email?: string;
  public fax?: string;
  public website?: string;

  @Type(() => GroupRequisites)
  public requisites?: GroupRequisites;

  @Type(() => GroupAdditionalInformation)
  public additionalInformation?: GroupAdditionalInformation;

  //region Transient

  public stateEnum?: GroupPersonTypeStateEnum;
  public claimStateEnum?: GroupClaimStateEnum;
  public dataOperator?: boolean;
  public bookmarked?: boolean;

  //endregion

}
