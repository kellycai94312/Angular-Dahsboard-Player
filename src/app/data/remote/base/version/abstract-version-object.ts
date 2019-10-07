import { Type } from 'class-transformer';
import { Person } from '../../model/person';
import { IdentifiedObject } from '../identified-object';
import { VersionActionType } from './version-action-type';

export abstract class AbstractVersionObject extends IdentifiedObject {

  @Type(() => Person)
  public author: Person;

  public approved?: boolean;

  //region Transient
  public versionActionType?: VersionActionType;
  public object?: any;
  public approvedObject?: any;
  //endregion

}
