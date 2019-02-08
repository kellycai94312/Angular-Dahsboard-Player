import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {AuthorizationService} from '../../../../../../shared/authorization.service';
import {Person} from '../../../../../../data/remote/model/person';
import {Direction} from '../../../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../../../data/remote/rest-api/page-query';
import {ConversationWrapper} from '../../../../../../data/local/conversation-wrapper';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../../../utils/app-helper';
import {NgxVirtualScrollComponent} from '../../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {ISubscription} from 'rxjs-compat/Subscription';
import {ConversationService} from '../../../../../../shared/conversation.service';
import {MessageWrapper} from '../../../../../../data/remote/bean/wrapper/message-wrapper';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {Chat} from '../../../../../../data/remote/model/chat/conversation/chat';
import {ConversationModalService} from '../../../../service/conversation-modal/conversation-modal.service';

@Component({
  selector: 'chat-chats-sidenav',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ChatChatsSidenavComponent implements OnInit {
  person: Person;

  public readonly propertyConstantClass = PropertyConstant;
  public query: PageQuery;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  private readonly _messageCreateSubscription: ISubscription;
  private readonly _messageUpdateSubscription: ISubscription;
  private readonly _messageReadSubscription: ISubscription;
  private readonly _messageDeleteSubscription: ISubscription;
  private readonly _typingSubscription: ISubscription;

  constructor(private _authorizationService: AuthorizationService,
              private _participantRestApiService: ParticipantRestApiService,
              private _conversationService: ConversationService,
              private _conversationModalService: ConversationModalService,
              private _appHelper: AppHelper) {
    this.query = new PageQuery();

    this._messageCreateSubscription = this._conversationService.messageCreateHandle.subscribe(x => {
      if (!this.ngxVirtualScrollComponent) {
        return;
      }
      this.updateItem(x);
    });

    this._messageUpdateSubscription = this._conversationService.messageUpdateHandle.subscribe(x => {
      if (!this.ngxVirtualScrollComponent) {
        return;
      }
      const messageWrapper = this.findMessageWrapper(x);
      if (messageWrapper) {
        x.unread = messageWrapper.unread;
        this.updateItem(x);
      }
    });

    this._messageReadSubscription = this._conversationService.messageReadHandle.subscribe(x => {
      if (!this.ngxVirtualScrollComponent) {
        return;
      }

      const items: Array<ConversationWrapper> = this.ngxVirtualScrollComponent.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].messageWrapper.message.content.baseConversation.id == x.content.baseConversation.id) {
          items[i].messageWrapper.message = x;
          break;
        }
      }
    });

    this._messageDeleteSubscription = this._conversationService.messageDeleteHandle.subscribe(async x => {
      if (!this.ngxVirtualScrollComponent) {
        return;
      }
      const messageWrapper = this.findMessageWrapper(x);
      if (messageWrapper) {
        if (x.previousMessage) {
          const updatedMessageWrapper = Object.assign({}, x);
          updatedMessageWrapper.message = updatedMessageWrapper.previousMessage;
          this.replaceItem(x, updatedMessageWrapper);
        } else {
          this.removeItem(x);
        }
      }
    });

    this._typingSubscription = this._conversationService.typingHandle.subscribe(async participant => {
      if (!this.ngxVirtualScrollComponent) {
        return;
      }

      const conversationWrappers: ConversationWrapper[] = this.ngxVirtualScrollComponent.items
        .filter(conversationWrapper =>
          (conversationWrapper.messageWrapper.empty ? conversationWrapper.messageWrapper.participant.baseConversation.id :
            conversationWrapper.messageWrapper.message.content.baseConversation.id) == participant.baseConversation.id);

      if (conversationWrappers.length) {
        const conversationWrapper = conversationWrappers[0];
        const participants = conversationWrapper.typingParticipants;
        const index = participants.findIndex(x => x.id == participant.id);
        if (0 <= index) {
          clearTimeout(conversationWrapper.receiveTypingTimeout);
        } else {
          participants.push(participant);
        }
        conversationWrapper.receiveTypingTimeout = setTimeout(() => {
          participants.splice(participants.indexOf(participant), 1);
        }, 1500);
      }
    });
  }

  async ngOnInit() {
    this.person = await this._appHelper.toPromise(this._authorizationService.personSubject);
    await this.resetItems();
  }

  public onCreateChat = async () => {
    if (await this._conversationModalService.showEditChat(new Chat())) {
      await this.resetItems();
    }
  };

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getActiveMessages(query);
    return this._appHelper.pageContainerConverter(pageContainer, messageWrapper => new ConversationWrapper(messageWrapper));
  };

  public async onSearchTextChanged(val: string) {
    if (val) {
      this.query.name = val;
    } else {
      delete this.query.name;
    }
    await this.resetItems();
  }

  private async resetItems(): Promise<void> {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

  private updateItem(messageWrapper: MessageWrapper): void {
    this.removeItem(messageWrapper);
    this.addItem(messageWrapper);
  }

  private replaceItem(src: MessageWrapper, dst: MessageWrapper): void {
    this.removeItem(src);
    this.addItem(dst);
  }

  private addItem(messageWrapper: MessageWrapper) {
    this.ngxVirtualScrollComponent.items.unshift(new ConversationWrapper(messageWrapper));
  }

  private removeItem(messageWrapper: MessageWrapper): void {
    const items: Array<ConversationWrapper> = this.ngxVirtualScrollComponent.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].messageWrapper.message.content.baseConversation.id == messageWrapper.message.content.baseConversation.id) {
        items.splice(i, 1);
        return;
      }
    }
  }

  private findMessageWrapper(x: MessageWrapper): MessageWrapper {
    const conversationWrappers: ConversationWrapper[] = this.ngxVirtualScrollComponent.items
      .filter(conversationWrapper => !conversationWrapper.messageWrapper.empty
        && conversationWrapper.messageWrapper.message.content.baseConversation.id == x.message.content.baseConversation.id);
    if (conversationWrappers.length) {
      const messageWrapper = conversationWrappers[0].messageWrapper;
      if (x.unread) {
        messageWrapper.unread = x.unread;
      }
      if (messageWrapper.message.id == x.message.id) {
        return messageWrapper;
      }
    }
    return null;
  }

}
