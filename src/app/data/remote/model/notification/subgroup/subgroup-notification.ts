import {BaseNotification} from '../base/base-notification';
import {SubgroupTemplateGroup} from '../../group/subgroup/template/subgroup-template-group';
import {NotificationType} from '../base/notification-type';
import {SubgroupNotificationType} from './subgroup-notification-type';

export class SubgroupNotification extends BaseNotification {

  public subgroupNotificationType: SubgroupNotificationType;
  public subgroupTemplateGroup: SubgroupTemplateGroup;
  /*текущая (старая) версия шаблона подгрупп когда SubgroupNotificationType.CREATE_SUBGROUP_TEMPLATE_VERSION*/
  public currentSubgroupTemplateGroup: SubgroupTemplateGroup;

  constructor() {
    super();
    this.discriminator = NotificationType.GROUP;
  }

}
