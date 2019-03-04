import {BaseMessageContent} from './base/base-message-content';
import {BaseMessageContentType} from './base/base-message-content-type';
import {BaseSubgroupVersion} from '../../group/subgroup/version/base-subgroup-version';
import {SubgroupTemplateGroup} from '../../group/subgroup/template/subgroup-template-group';

export class SubgroupMessageContent extends BaseMessageContent {

  public subgroupVersion: BaseSubgroupVersion;
  public subgroupTemplateGroup: SubgroupTemplateGroup;

  constructor() {
    super();
    this.discriminator = BaseMessageContentType.SUBGROUP_MESSAGE_CONTENT;
  }

}
