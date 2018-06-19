import {AfterContentInit, Component, Input} from '@angular/core';
import {MessageWrapper} from '../../../data/remote/bean/wrapper/message-wrapper';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {BaseConversationType} from '../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AppHelper} from '../../../utils/app-helper';
import {Person} from '../../../data/remote/model/person';
import {BaseConversation} from '../../../data/remote/model/chat/conversation/base/base-conversation';
import {Chat} from '../../../data/remote/model/chat/conversation/chat';
import {ImageClass} from '../../../data/remote/misc/image-class';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements AfterContentInit {

  @Input()
  public messageWrapper: MessageWrapper;

  public conversation: BaseConversation;
  public conversationImageClazz: ImageClass;
  public conversationImageId: number;
  public conversationName: string;
  public senderPerson: Person;

  /*тот, кто отправил сообщение*/

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
  }

  async ngAfterContentInit() {
    if (this.messageWrapper.empty) {

      /*нет сообщений*/
      this.conversation = this.messageWrapper.participant.baseConversation;

      switch (this.conversation.discriminator) {
        case BaseConversationType.CHAT:
          this.conversationImageClazz = ImageClass.CHAT;
          this.conversationImageId = this.conversation.id;
          this.conversationName = (<Chat> this.conversation).name;
      }

    } else {

      this.conversation = this.messageWrapper.message.content.baseConversation;
      if (this._authorizationService.session.personId == this.messageWrapper.message.sender.person.id) {
        this.senderPerson = this.messageWrapper.message.sender.person;
      }

      switch (this.conversation.discriminator) {
        case BaseConversationType.DIALOGUE:
          this.conversationImageClazz = ImageClass.PERSON;
          if (this._authorizationService.session.personId == this.messageWrapper.message.sender.person.id) {
            this.conversationImageId = this.messageWrapper.message.receiver.person.id;
            this.conversationName = this.getPersonFullName(this.messageWrapper.message.receiver.person);
          } else {
            this.conversationImageId = this.messageWrapper.message.sender.person.id;
            this.conversationName = this.getPersonFullName(this.messageWrapper.message.sender.person);
          }
          break;
        case BaseConversationType.CHAT:
          this.conversationImageClazz = ImageClass.CHAT;
          this.conversationImageId = this.conversation.id;
          this.conversationName = (<Chat> this.conversation).name;
      }

    }
  }

  private getPersonFullName(person: Person) {
    return person.lastName + ' ' + person.firstName;
  }

}
