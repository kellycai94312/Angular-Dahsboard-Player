import {IdentifiedObject} from '../identified-object';
import {VersionActionType} from './version-action-type';
import {Person} from '../../model/person';

export abstract class VersionObject extends IdentifiedObject {
  author: Person;
  approved?: boolean;
  versionActionType: VersionActionType;
  object?: any;
  approvedObject?: any;
}
