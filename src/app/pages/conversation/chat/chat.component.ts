import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {ChatService} from 'app/pages/conversation/chat/chat.service';
import {ConversationService} from '../../../shared/conversation.service';
import {BaseConversation} from '../../../data/remote/model/chat/conversation/base/base-conversation';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChatComponent implements OnInit {
  conversation: BaseConversation;
  person: Person;

  constructor(private _chatService: ChatService,
              private _conversationService: ConversationService,
              private _authorizationService: AuthorizationService) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();
    this._chatService.onChatSelected
      .subscribe(conversation => {
        this.conversation = conversation;
      });
  }

}
