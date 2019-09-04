import {BaseMessageContent} from './base/base-message-content';
import {MessageContentType} from './base/message-content-type';
import {BaseSubgroupVersion} from '../../group/subgroup/version/base-subgroup-version';
import {SubgroupTemplateGroupVersion} from '../../group/subgroup/template/subgroup-template-group-version';
import {Type} from 'class-transformer';

export class SubgroupMessageContent extends BaseMessageContent {

  @Type(() => BaseSubgroupVersion)
  public subgroupVersion: BaseSubgroupVersion;

  @Type(() => SubgroupTemplateGroupVersion)
  public subgroupTemplateGroupVersion?: SubgroupTemplateGroupVersion;

  constructor() {
    super();
    this.discriminator = MessageContentType.SUBGROUP_MESSAGE_CONTENT;
  }

}
