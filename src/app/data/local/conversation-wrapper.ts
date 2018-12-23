import {Participant} from '../remote/model/chat/participant';
import {MessageWrapper} from '../remote/bean/wrapper/message-wrapper';

export class ConversationWrapper {
  messageWrapper: MessageWrapper;
  receiveTypingTimeout: any;
  typingParticipants: Participant[];

  constructor(messageWrapper: MessageWrapper) {
    this.messageWrapper = messageWrapper;
    this.typingParticipants = [];
  }
}
