import {AfterContentInit, Component, Input} from '@angular/core';
import {MessageWrapper} from '../../../data/remote/bean/wrapper/message-wrapper';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {BaseConversationType} from '../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AppHelper} from '../../../utils/app-helper';
import {Person} from '../../../data/remote/model/person';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements AfterContentInit {

  @Input()
  public messageWrapper: MessageWrapper;

  public conversationPerson: Person;
  public conversationName: string;
  public interlocutorPerson: Person;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
  }

  async ngAfterContentInit() {
    switch (this.messageWrapper.message.content.baseConversation.discriminator) {
      case BaseConversationType.DIALOGUE:
        if (this._authorizationService.session.personId == this.messageWrapper.message.sender.person.id) {
          this.conversationPerson = this.messageWrapper.message.receiver.person;
          this.conversationName = this.messageWrapper.message.receiver.person.firstName;
        } else {
          this.conversationPerson = this.messageWrapper.message.sender.person;
          this.conversationName = this.messageWrapper.message.sender.person.firstName;
          this.interlocutorPerson = this.messageWrapper.message.receiver.person;
        }
        break;
    }
  }

}
