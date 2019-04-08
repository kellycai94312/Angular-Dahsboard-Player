import {BaseMessageContent} from './base/base-message-content';
import {BaseMessageContentType} from './base/base-message-content-type';
import {BaseSubgroupVersion} from '../../group/subgroup/version/base-subgroup-version';
import {SubgroupTemplateGroupVersion} from '../../group/subgroup/template/subgroup-template-group-version';

export class SubgroupMessageContent extends BaseMessageContent {
  public subgroupVersion: BaseSubgroupVersion;
  public subgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;

  constructor() {
    super();
    this.discriminator = BaseMessageContentType.SUBGROUP_MESSAGE_CONTENT;
  }
}
