import {Exclude, Type} from 'class-transformer';
import {Event} from '../model/event/event';
import {EventType} from '../model/event/base/event-type';
import {Training} from '../model/event/training';
import {Testing} from '../model/event/testing';
import {Game} from '../model/event/game';
import {Competition} from '../model/event/competition';
import {Relaxation} from '../model/event/relaxation';
import {Diet} from '../model/event/diet';
import {Meeting} from '../model/event/meeting';
import {Education} from '../model/event/education';
import {GroupNotification} from '../model/notification/group/group-notification';
import {NotificationType} from '../model/notification/base/notification-type';
import {SubgroupNotification} from '../model/notification/subgroup/subgroup-notification';
import {GroupConnectionNotification} from '../model/notification/group/connection/group-connection-notification';
import {EventNotification} from '../model/notification/event/event-notification';
import {EventPollNotification} from '../model/notification/event/poll/event-poll-notification';
import {Chat, ConversationType, Dialogue} from '../model/chat/conversation';
import {EventMessageContent, FileMessageContent, MessageContent, MessageContentType, PollMessageContent, SubgroupMessageContent, SystemMessageContent} from '../model/chat/message';

export class DiscriminatorPageContainer<T> {

  public from: number;
  public size: number;
  public total: number;

  // TODO: Parsing by discriminator
  @Type(options => (options.newObject as DiscriminatorPageContainer<T>)._type, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        //region Event
        {value: Event, name: EventType.EVENT},
        {value: Training, name: EventType.TRAINING},
        {value: Testing, name: EventType.TESTING},
        {value: Game, name: EventType.GAME},
        {value: Competition, name: EventType.COMPETITION},
        {value: Relaxation, name: EventType.RELAXATION},
        {value: Diet, name: EventType.DIET},
        {value: Meeting, name: EventType.MEETING},
        {value: Education, name: EventType.EDUCATION},
        //endregion
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
