import {IdentifiedObject} from '../../base/identified-object';
import {Person} from '../person';
import {BaseConversation, ConversationType} from './conversation/base';
import {Type} from 'class-transformer';
import {Chat, Dialogue} from './conversation';

export class Participant extends IdentifiedObject {

  @Type(() => BaseConversation, {
    discriminator: {
      property: 'discriminator',
      subTypes: [
        {value: Chat, name: ConversationType.CHAT},
        {value: Dialogue, name: ConversationType.DIALOGUE},
      ],
    },
    keepDiscriminatorProperty: true
  })
  public baseConversation: BaseConversation;

  @Type(() => Person)
  public person: Person;

  public enabled: boolean;

}
