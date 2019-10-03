import { Exclude, Type } from 'class-transformer';
import { Chat, ConversationType, Dialogue } from '../model/chat/conversation';
import { EventMessageContent, FileMessageContent, MessageContent, MessageContentType, PollMessageContent, SubgroupMessageContent, SystemMessageContent } from '../model/chat/message';
import { EVENT_SUBTYPES } from '../model/event/base/event-subtypes';
import { GROUP_SUBTYPES } from '../model/group/base/group-subtypes';
import { NotificationType } from '../model/notification/base/notification-type';
import { EventNotification } from '../model/notification/event/event-notification';
import { EventPollNotification } from '../model/notification/event/poll/event-poll-notification';
import { GroupConnectionNotification } from '../model/notification/group/connection/group-connection-notification';
import { GroupNotification } from '../model/notification/group/group-notification';
import { SubgroupNotification } from '../model/notification/subgroup/subgroup-notification';

export class DiscriminatorPageContainer<T> {

  public from: number;
  public size: number;
  public total: number;

  // TODO: Parsing by discriminator
  @Type(options => (options.newObject as DiscriminatorPageContainer<T>)._type, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        ...EVENT_SUBTYPES,
        ...GROUP_SUBTYPES,
        //region Notification
        {value: GroupNotification, name: NotificationType.GROUP},
        {value: SubgroupNotification, name: NotificationType.SUBGROUP},
        {value: GroupConnectionNotification, name: NotificationType.GROUP_CONNECTION},
        {value: EventNotification, name: NotificationType.EVENT},
        {value: EventPollNotification, name: NotificationType.EVENT_POLL},
        //endregion
        //region Conversation
        {value: Chat, name: ConversationType.CHAT},
        {value: Dialogue, name: ConversationType.DIALOGUE},
        //endregion
        //region Message content
        {value: MessageContent, name: MessageContentType.MESSAGE_CONTENT},
        {value: SystemMessageContent, name: MessageContentType.SYSTEM_MESSAGE_CONTENT},
        {value: EventMessageContent, name: MessageContentType.EVENT_MESSAGE_CONTENT},
        {value: SubgroupMessageContent, name: MessageContentType.SUBGROUP_MESSAGE_CONTENT},
        {value: FileMessageContent, name: MessageContentType.FILE_MESSAGE_CONTENT},
        {value: PollMessageContent, name: MessageContentType.POLL_MESSAGE_CONTENT}
        //endregion
      ]
    },
    keepDiscriminatorProperty: true
  })
  public list: T[];

  @Exclude()
  private readonly _type: Function;

  constructor(type?: Function) {
    this._type = type;
  }

}
