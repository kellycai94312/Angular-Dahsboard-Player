import {IdentifiedObject} from '../../base/identified-object';
import {Group} from './base/group';
import {GroupConnectionType} from './group-connection-type';

export class GroupConnection extends IdentifiedObject {
  public source: Group;
  public target: Group;
  public type: GroupConnectionType;
  public approved: boolean;
  public visibleBySource: boolean;
  public visibleByTarget: boolean;
}
