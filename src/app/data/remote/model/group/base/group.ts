import { GroupPersonTypeClaimState } from 'app/data/remote/model/group/person';
import { Type } from 'class-transformer';
import { NamedObject } from '../../../base';
import { Activity } from '../../activity/activity';
import { BaseAddress } from '../../address/base/base-address';
import { PlainAddress } from '../../address/plain-address';
import { Person } from '../../person';
import { GroupPersonTypeState } from '../person/type/group-person-type-state';
import { GroupTypeEnum } from './group-type-enum';

export class Group extends NamedObject {

  public discriminator: GroupTypeEnum;

  @Type(type => BaseAddress)
  public address?: BaseAddress;

  @Type(type => PlainAddress)
  public legalAddress?: PlainAddress;

  @Type(type => Activity)
  public activity: Activity;

  @Type(type => Person)
  public head?: Person;

  public approved?: boolean;
  public visible?: boolean;
  public fullName?: string;
  public shortName?: string;
  public phone?: string;
  public inn?: string;
  public kpp?: string;
  public oktmo?: string;
  public okdad?: string;
  public okpo?: string;
  public recipient?: string;
  public recipientPersonalAccount?: string;
  public bankFacility?: string;
  public account?: string;
  public bik?: string;
  public kbk?: string;
  public email?: string;
  public fax?: string;
  public website?: string;
  public stateRegistrationCertificateNumber?: string;
  public accreditationOrderNumber?: string;
  public paymentAccount?: string;
  public correspondentAccount?: string;

  //region Transient

  public groupPersonState?: GroupPersonTypeState;
  public groupPersonTypeClaimState?: GroupPersonTypeClaimState;
  public dataOperator?: boolean;
  public bookmarked?: boolean;

  //endregion

}
