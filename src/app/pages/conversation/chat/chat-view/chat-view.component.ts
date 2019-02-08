import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {ChatService} from 'app/pages/conversation/chat/chat.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {Person} from '../../../../data/remote/model/person';
import {MessageContent} from '../../../../data/remote/model/chat/message/message-content';
import {BaseMessageContentType} from '../../../../data/remote/model/chat/message/base/base-message-content-type';
import {Message} from '../../../../data/remote/model/chat/message/message';
import {IconEnum} from '../../../../components/ngx-button/model/icon-enum';
import {BaseConversationType} from '../../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {ImageComponent} from '../../../../components/image/image.component';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Participant} from '../../../../data/remote/model/chat/participant';
import {BaseConversation} from '../../../../data/remote/model/chat/conversation/base/base-conversation';
import {HashSet} from '../../../../data/local/hash-set';
import {ConversationService} from '../../../../shared/conversation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppHelper} from '../../../../utils/app-helper';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {ConfirmationRemovingMessageComponent} from '../../../../module/conversation/confirmation-removing-message/confirmation-removing-message/confirmation-removing-message.component';
import {EventMessageContent} from '../../../../data/remote/model/chat/message/event-message-content';
import {BaseMessageContent} from '../../../../data/remote/model/chat/message/base/base-message-content';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ParticipantStompService} from '../../../../data/remote/web-socket/participant-stomp.service';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageToastrService} from '../../../../components/message-toastr/message-toastr.service';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {ConversationModalService} from '../../service/conversation-modal/conversation-modal.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {NgForm} from '@angular/forms';
import {ISubscription} from 'rxjs-compat/Subscription';
import {SystemMessageContent} from '../../../../data/remote/model/chat/message/system-message-content';
import {SystemMessageContentType} from '../../../../data/remote/model/chat/message/system-message-content-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatViewComponent implements OnInit, OnDestroy {

  public readonly iconEnumClass = IconEnum;
  public readonly baseConversationTypeClass = BaseConversationType;
  public readonly fileClass = FileClass;

  @ViewChild('logo')
  public logo: ImageComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @ViewChild('replyForm')
  replyForm: NgForm;

  public messageContent: MessageContent;
  public person: Person;
  public conversation: BaseConversation;
  public enabled: boolean;
  public selectedMessages: HashSet<Message>;
  public editedMessage: Message;
  public canEditMessage: boolean;
  public recipient: Participant;

  private _maxMessageDate: Date;
  private _typingTimeout: any;
  private readonly _messageCreateSubscription: ISubscription;
  private readonly _messageUpdateSubscription: ISubscription;
  private readonly _messageDeleteSubscription: ISubscription;
  private readonly _messageReadSubscription: ISubscription;

  constructor(private _chatService: ChatService,
              private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService,
              private _authorizationService: AuthorizationService,
              private _translateService: TranslateService,
              private _modalService: NgbModal,
              private _messageToastrService: MessageToastrService,
              private _templateModalService: TemplateModalService,
              private _conversationModalService: ConversationModalService,
              private _ngxModalService: NgxModalService,
              private _router: Router) {
    this.messageContent = new MessageContent();
    this._maxMessageDate = new Date();
    this.selectedMessages = this._conversationService.selectedMessages;
    this.canEditMessage = false;

    this._messageCreateSubscription = this._conversationService.messageCreateHandle.subscribe(async x => {
      if (x.message.content.baseConversation.id != this.conversation.id || !this.ngxVirtualScrollComponent) {
        return;
      }

      if (x.message.sender.person.id != this.person.id) {
        this.readMessageFrom(x.message.created);
        this._conversationService.readMessage(x);
      }

      if (x.message.content.discriminator === BaseMessageContentType.SYSTEM_MESSAGE_CONTENT && x.message.sender.person.id != this.person.id) { // Exclude update duplication
        switch ((x.message.content as SystemMessageContent).systemMessageType) {
          case SystemMessageContentType.UPDATE_LOGO:
            this.logo.refresh();
            break;
          case SystemMessageContentType.UPDATE_NAME:
            this.conversation = x.message.content.baseConversation;
        }
      }

      await this.ngxVirtualScrollComponent.addItem(x.message);
    });
    this._messageUpdateSubscription = this._conversationService.messageUpdateHandle.subscribe(x => {
      if (x.message.content.baseConversation.id != this.conversation.id || !this.ngxVirtualScrollComponent) {
        return;
      }

      const items: Array<Message> = this.ngxVirtualScrollComponent.items;
      // TODO: Optimize read message algorithm!
      for (let i = 0; i < items.length; i++) {
        if (items[i].content.id == x.message.content.id) {
          items[i] = x.message;
          break;
        }
      }
    });
    this._messageDeleteSubscription = this._conversationService.messageDeleteHandle.subscribe(x => {
      if (x.message.content.baseConversation.id != this.conversation.id || !this.ngxVirtualScrollComponent) {
        return;
      }

      const items: Array<Message> = this.ngxVirtualScrollComponent.items;
      // TODO: Optimize read message algorithm!
      for (let i = 0; i < items.length; i++) {
        if (items[i].content.id == x.message.content.id) {
          items.splice(i, 1);
          break;
        }
      }
    });
    this._messageReadSubscription = this._conversationService.messageReadHandle.subscribe(x => {
      if (x.content.baseConversation.id != this.conversation.id || !this.ngxVirtualScrollComponent) {
        return;
      }

      const items: Array<Message> = this.ngxVirtualScrollComponent.items;
      // TODO: Optimize read message algorithm!
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (!item.read && item.content.created <= x.content.created) {
          item.read = true;
        }
      }
    });

  }

  public async initialize(conversation: BaseConversation) {
    return await this._appHelper.tryLoad(async () => {
      this.conversation = conversation;
      this.person = await this._authorizationService.getPerson();
      this._messageToastrService.clearToasts(this.conversation.id);
      this.enabled = (await this._participantRestApiService.getMessageNotificationsStatus({conversationId: conversation.id})).value;
      switch (this.conversation.discriminator) {
        case BaseConversationType.DIALOGUE:
          // Get recipient
          const participantsContainer = await this._participantRestApiService.getParticipants({conversationId: conversation.id});
          if (participantsContainer.size > 0) {
            this.recipient = participantsContainer.list[0];
          }
          break;
        default:
          this.recipient = new Participant();
      }
      await this.ngxVirtualScrollComponent.reset();
    });
  }

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();
    this._chatService.onChatSelected
      .subscribe(conversation => {
        if (conversation) {
          this.initialize(conversation);
        } else {
          this.navigateToConversations();
        }
      });
  }

  ngOnDestroy(): void {
    this._messageCreateSubscription.unsubscribe();
    this._messageUpdateSubscription.unsubscribe();
    this._messageDeleteSubscription.unsubscribe();
    this._messageReadSubscription.unsubscribe();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = (await this._participantRestApiService.getMessages({}, query, {conversationId: this.conversation.id}));

    let lastUnreadMessage: Date;
    pageContainer.list = pageContainer.list.map(x => {
      if (!x.receiver || x.receiver.person.id == this.person.id && !x.read) {
        x.read = true;
        lastUnreadMessage = x.content.created;
      }
      return x;
    });

    if (lastUnreadMessage) {
      this.readMessageFrom(lastUnreadMessage);
    }
    return pageContainer;
  };

  public sendMessage: Function = async () => {
    if (!this.messageContent.content || !this.messageContent.content.trim()) {
      return;
    }
    this.messageContent.content = this.messageContent.content.trim();

    if (this.editedMessage) {
      // Update message
      await this._appHelper.tryAction('', 'sendError', async () => {
        this.editedMessage.content = await this._participantRestApiService.updateMessage(this.messageContent, {}, {
          conversationId: this.conversation.id,
          messageContentId: this.messageContent.id
        });
        this.cancelEditMessage();
      });
    } else {
      if (await this.createMessage(this.messageContent)) {
        this.messageContent.content = null;
      }
    }
  };

  public addNewRow() {
    // TODO: Add new row
  }

  public onTyping() {
    clearTimeout(this._typingTimeout);
    this._typingTimeout = setTimeout(() => {
      this._participantStompService.publishConversationTyping({id: this.conversation.id});
    }, 150);
  }

  public async editChat() {
    const dialogResult = await this._conversationModalService.showEditChat(this.conversation as Chat);
    if (dialogResult.result) {
      this._appHelper.updateObject(this.conversation, dialogResult.data);
      this.logo.refresh();
    }
  }

  public toggleSelectMessage = (message: Message) => {
    if (this.isMessageSelected(message)) {
      this.selectedMessages.remove(message);
    } else {
      this.selectedMessages.add(message);
    }
    this.updateCanEditMessage();
  };

  public isMessageSelected(message: Message) {
    return this.selectedMessages.contains(message);
  }

  public startEditMessage = async () => {
    this.editedMessage = this.selectedMessages.data[0];
    this.messageContent = Object.assign({}, this.editedMessage.content as MessageContent);
  };

  public cancelEditMessage() {
    delete this.editedMessage;
    this.messageContent = new MessageContent();
    this.selectedMessages.removeAll();
    this.updateCanEditMessage();
  }

  public deleteSelectedMessages = async () => {
    const messages: Message[] = this.selectedMessages.data;
    const modal = this._ngxModalService.open();
    modal.componentInstance.titleKey = 'deleteSelectedMessages';
    await modal.componentInstance.initializeBody(ConfirmationRemovingMessageComponent, async component => {
      component.conversation = this.conversation;
      component.messages = messages;

      modal.componentInstance.splitButtonItems = [
        {
          nameKey: 'apply',
          callback: async () => {
            if (await component.onRemove()) {
              this.ngxVirtualScrollComponent.items = this.ngxVirtualScrollComponent.items.filter(item => !messages.includes(item));
              this.selectedMessages.removeAll();
              this.updateCanEditMessage();
              modal.close();
            }
          }
        }
      ];
    });
  };

  public async clearMessagesHistory() {
    if (await this._templateModalService.showConfirmModal('areYouSure')) {
      await this._participantRestApiService.removeAllMessages({conversationId: this.conversation.id});
      this.ngxVirtualScrollComponent.items = [];
      this.updateCanEditMessage();
    }
  }

  public updateCanEditMessage() {
    this.canEditMessage = this.selectedMessages.size() == 1
      && this.selectedMessages.data.filter(message => message.content.discriminator === BaseMessageContentType.MESSAGE_CONTENT
        && message.sender.person.id == this.person.id).length == 1;
  }

  public async quitChat() {
    if (await this._templateModalService.showConfirmModal('areYouSure')) {
      await this._participantRestApiService.quitChat({conversationId: this.conversation.id});
      await this.navigateToConversations();
    }
  }

  public async toggleNotifications() {
    if (this.enabled) {
      await this._participantRestApiService.disableMessageNotifications({conversationId: this.conversation.id});
    } else {
      await this._participantRestApiService.enableMessageNotifications({conversationId: this.conversation.id});
    }
    this.enabled = !this.enabled;
  }

  public onAddEvent = async () => {
    const dialogResult = await this._templateModalService.showEditEventModal(null, null, null, this.conversation, true);
    if (dialogResult.result) {
      const message = new EventMessageContent();
      message.training = dialogResult.data;
      await this.createMessage(message);
    }
  };

  private readMessageFrom(date: Date): void {
    this._participantStompService.publishConversationRead({
      id: this.conversation.id,
      lastDate: this._appHelper.getGmtDate(date)
    });
  }

  private async createMessage<T extends BaseMessageContent>(messageContent: T): Promise<boolean> {
    return await this._appHelper.tryAction('', 'sendError', async () => {
      await this._participantRestApiService.createMessage(messageContent, {}, {conversationId: this.conversation.id});
    });
  }

  private navigateToConversations() {
    this._router.navigate(['/conversation']);
  }

}
