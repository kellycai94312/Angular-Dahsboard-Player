import {Participant} from '../../data/remote/model/chat/participant';
import {MessageWrapper} from '../../data/remote/bean/wrapper/message-wrapper';

export class ConversationWrapper {
  messageWrapper: MessageWrapper;
  receiveTypingTimeout: any;
  typingParticipants: Participant[];

  constructor(messageWrapper: MessageWrapper) {
    this.messageWrapper = messageWrapper;
    this.typingParticipants = [];
  }

}
