import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../data/remote/model/chat/message/message';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {BaseMessageContentType} from '../../../../data/remote/model/chat/message/base/base-message-content-type';
import {AppHelper} from '../../../../utils/app-helper';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {BaseConversation} from '../../../../data/remote/model/chat/conversation/base/base-conversation';

@Component({
  selector: 'app-confirmation-removing-message',
  templateUrl: './confirmation-removing-message.component.html',
  styleUrls: ['./confirmation-removing-message.component.scss']
})
export class ConfirmationRemovingMessageComponent implements OnInit {

  @Input()
  public conversation: BaseConversation;

  @Input()
  public messages: Message[];

  public canDeleteForReceiver: boolean;
  public deleteForReceiver: boolean;

  constructor(private _appHelper: AppHelper,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService) {
    this.canDeleteForReceiver = false;
    this.deleteForReceiver = false;
  }

  async ngOnInit() {
    const person = await this._authorizationService.getPerson();
    for (let message of this.messages) {
      if (message.sender.person.id != person.id || message.read || message.content.discriminator === BaseMessageContentType.SYSTEM_MESSAGE_CONTENT) {
        return;
      }
    }
    this.canDeleteForReceiver = true;
  }

  public async onRemove(): Promise<boolean> {
    return await this._appHelper.tryRemove(async () => {
        const listRequest = new ListRequest(this.messages.map(message => new IdRequest(message.content.id)));
        await this._participantRestApiService.removeMessages(listRequest, {deleteForReceiver: this.deleteForReceiver}, {conversationId: this.conversation.id});
      }
    );
  }

}
