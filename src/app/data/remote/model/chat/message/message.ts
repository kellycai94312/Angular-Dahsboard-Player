import {IdentifiedObject} from '../../../base/identified-object';
import {Participant} from '../participant';
import {BaseMessageContent} from './base/base-message-content';
import {Type} from 'class-transformer';
import {MessageContent} from './message-content';
import {MessageContentType} from './base/message-content-type';
import {SystemMessageContent} from './system-message-content';
import {EventMessageContent} from './event-message-content';
import {SubgroupMessageContent} from './subgroup-message-content';
import {FileMessageContent} from './file-message-content';
import {PollMessageContent} from './poll-message-content';

export class Message extends IdentifiedObject {

  @Type(() => Participant)
  public sender: Participant;

  @Type(() => Participant)
  public receiver?: Participant;

  @Type(() => BaseMessageContent, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        {value: MessageContent, name: MessageContentType.MESSAGE_CONTENT},
        {value: SystemMessageContent, name: MessageContentType.SYSTEM_MESSAGE_CONTENT},
        {value: EventMessageContent, name: MessageContentType.EVENT_MESSAGE_CONTENT},
        {value: SubgroupMessageContent, name: MessageContentType.SUBGROUP_MESSAGE_CONTENT},
        {value: FileMessageContent, name: MessageContentType.FILE_MESSAGE_CONTENT},
        {value: PollMessageContent, name: MessageContentType.POLL_MESSAGE_CONTENT}
      ]
    },
    keepDiscriminatorProperty: true
  })
  public content?: BaseMessageContent;

  public read?: boolean;

}
