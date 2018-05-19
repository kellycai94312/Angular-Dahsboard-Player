import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {MessageWrapper} from '../../../data/remote/bean/wrapper/message-wrapper';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {BaseConversationType} from '../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {AuthorizationService} from '../../../shared/authorization.service';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit, AfterContentInit {

  @Input()
  public messageWrapper: MessageWrapper;

  public conversationImageUrl: string;
  public conversationName: string;
  public interlocutorImageUrl: string;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _authorizationService: AuthorizationService) {
  }

  ngOnInit() {
  }

  async ngAfterContentInit() {
    switch (this.messageWrapper.message.baseConversation.discriminator) {
      case BaseConversationType.DIALOGUE:
        if (this._authorizationService.session.personId == this.messageWrapper.message.sender.person.id) {
          this.conversationImageUrl = this._appHelper.getPersonImageUrl(this.messageWrapper.message.receiver.person);
          this.conversationName = this.messageWrapper.message.receiver.person.firstName;
        } else {
          this.conversationImageUrl = this._appHelper.getPersonImageUrl(this.messageWrapper.message.sender.person);
          this.conversationName = this.messageWrapper.message.sender.person.firstName;
          this.interlocutorImageUrl = this._appHelper.getPersonImageUrl(this.messageWrapper.message.receiver.person);
        }
        break;
    }
  }

}
