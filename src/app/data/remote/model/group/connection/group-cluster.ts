import {NamedObject} from '../../../base/named-object';
import {Group} from '../base/group';

export class GroupCluster extends NamedObject {
  public group: Group;
  public canEdit: boolean;
}
