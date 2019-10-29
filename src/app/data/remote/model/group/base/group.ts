import { Type } from 'class-transformer';
import { NamedObject } from '../../../base';
import { Activity } from '../../activity/activity';
import { BaseAddress } from '../../address/base/base-address';
import { PlainAddress } from '../../address/plain-address';
import { Person } from '../../person';
import { GroupPersonState } from '../person/group-person-state';
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
  public recipient?: string;
  public recipientPersonalAccount?: string;
  public bankFacility?: string;
  public account?: string;
  public bik?: string;
  public kbk?: string;
  public email?: string;

  //region Transient

  public groupPersonState?: GroupPersonState;
  public dataOperator?: boolean;
  public bookmarked?: boolean;

  //endregion

}
