import { Exclude, Type } from 'class-transformer';
import { EVENT_SUBTYPES } from '../model/event/base';
import { GROUP_SUBTYPES } from '../model/group/base';
import { GroupContractJob, GroupContractService, GroupContractType } from '../model/group/contract';
import { NotificationType } from '../model/notification/base/notification-type';
import { EventNotification } from '../model/notification/event/event-notification';
import { EventPollNotification } from '../model/notification/event/poll/event-poll-notification';
import { GroupConnectionNotification } from '../model/notification/group/connection/group-connection-notification';
import { GroupNotification } from '../model/notification/group/group-notification';
import { SubgroupNotification } from '../model/notification/subgroup/subgroup-notification';

export class DiscriminatorObject {

  // TODO: Parsing by discriminator
  @Type(options => (options.newObject as DiscriminatorObject)._type, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        ...EVENT_SUBTYPES,
        //region Notification
        {value: GroupNotification, name: NotificationType.GROUP},
        {value: SubgroupNotification, name: NotificationType.SUBGROUP},
        {value: GroupConnectionNotification, name: NotificationType.GROUP_CONNECTION},
        {value: EventNotification, name: NotificationType.EVENT},
        {value: EventPollNotification, name: NotificationType.EVENT_POLL},
        //endregion
        //region GroupContract
        {value: GroupContractService, name: GroupContractType.SERVICE},
        {value: GroupContractJob, name: GroupContractType.JOB},
        //endregion
        ...GROUP_SUBTYPES
      ]
    },
    keepDiscriminatorProperty: true
  })
  public obj: any;

  @Exclude()
  private readonly _type: Function;

  constructor(type: Function) {
    this._type = type;
  }

}
