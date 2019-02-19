import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

import {ChatService} from 'app/pages/conversation/chat/chat.service';
import {ConversationWrapper} from '../../../../../data/local/conversation-wrapper';

@Component({
  selector: 'chat-left-sidenav',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChatLeftSidenavComponent implements OnInit {
  view: string;

  /**
   * Constructor
   *
   * @param {ChatService} _chatService
   */
  constructor(
    private _chatService: ChatService
  ) {
    // Set the defaults
    this.view = 'chats';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._chatService.onLeftSidenavViewChanged
      .subscribe(view => {
        this.view = view;
      });
  }

  public onSelectedConversation(val: ConversationWrapper) {
    this._chatService.onChatSelected.next(val.messageWrapper.message.content.baseConversation);
  }

}
