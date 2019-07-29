import {NamedObject} from '../../../base/named-object';
import {Address} from '../../address';
import {GroupTypeEnum} from './group-type-enum';
import {Activity} from '../../activity/activity';
import {Type} from 'class-transformer';
import {Person} from '../../person';
import {PlainAddress} from '../../address/plain-address';

export class Group extends NamedObject {

  public discriminator: GroupTypeEnum;

  @Type(type => Address)
  public address?: Address;

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
  public bankFacility?: string;
  public account?: string;
  public bik?: string;
  public kbk?: string;

}
