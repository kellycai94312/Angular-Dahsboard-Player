import {BaseNotification} from '../base/base-notification';
import {SubgroupTemplateGroup} from '../../group/subgroup/template/subgroup-template-group';
import {NotificationType} from '../base/notification-type';
import {SubgroupNotificationType} from './subgroup-notification-type';
import {SubgroupTemplateGroupVersion} from '../../group/subgroup/template/subgroup-template-group-version';
import {Type} from 'class-transformer';

export class SubgroupNotification extends BaseNotification {

  public subgroupNotificationType: SubgroupNotificationType;

  @Type(() => SubgroupTemplateGroup)
  public subgroupTemplateGroup: SubgroupTemplateGroup;

  /*новая версия шаблона подгрупп когда SubgroupNotificationType = CREATE_SUBGROUP_TEMPLATE_GROUP_VERSION*/
  @Type(() => SubgroupTemplateGroupVersion)
  public newSubgroupTemplateGroupVersion: SubgroupTemplateGroupVersion;

  constructor() {
    super();
    this.discriminator = NotificationType.SUBGROUP;
  }

}
