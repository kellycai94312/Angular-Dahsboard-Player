import {IdentifiedObject} from '../../../../base/identified-object';

export class SubgroupTemplateVersion extends IdentifiedObject {
  public subgroupTemplateId: number;
  public versionNumber: number;
  public approved: boolean;
}
