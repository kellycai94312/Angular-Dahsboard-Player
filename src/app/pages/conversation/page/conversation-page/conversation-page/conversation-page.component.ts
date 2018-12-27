import {Component, OnDestroy, ViewChild} from '@angular/core';
import {IconEnum} from '../../../../../components/ngx-button/model/icon-enum';
import {BaseConversationType} from '../../../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {ImageComponent} from '../../../../../components/image/image.component';
import {NgxVirtualScrollComponent} from '../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {MessageContent} from '../../../../../data/remote/model/chat/message/message-content';
import {Person} from '../../../../../data/remote/model/person';
import {PageQuery} from '../../../../../data/remote/rest-api/page-query';
import {BaseConversation} from '../../../../../data/remote/model/chat/conversation/base/base-conversation';
import {Participant} from '../../../../../data/remote/model/chat/participant';
import {HashSet} from '../../../../../data/local/hash-set';
import {Message} from '../../../../../data/remote/model/chat/message/message';
import {ISubscription} from 'rxjs-compat/Subscription';
import {ParticipantRestApiService} from '../../../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppHelper} from '../../../../../utils/app-helper';
import {ConversationService} from '../../../../../shared/conversation.service';
import {ParticipantStompService} from '../../../../../data/remote/web-socket/participant-stomp.service';
import {AuthorizationService} from '../../../../../shared/authorization.service';
import {TranslateService} from '@ngx-translate/core';
import {MessageToastrService} from '../../../../../components/message-toastr/message-toastr.service';
import {TemplateModalService} from '../../../../../service/template-modal.service';
import {BaseMessageContentType} from '../../../../../data/remote/model/chat/message/base/base-message-content-type';
import {SystemMessageContent} from '../../../../../data/remote/model/chat/message/system-message-content';
import {SystemMessageContentType} from '../../../../../data/remote/model/chat/message/system-message-content-type';
import {Direction} from '../../../../../components/ngx-virtual-scroll/model/direction';
import {Chat} from '../../../../../data/remote/model/chat/conversation/chat';
import {ModalConfirmDangerComponent} from '../../../../../components/modal-confirm/modal-confirm-danger.component';
import {EventMessageContent} from '../../../../../data/remote/model/chat/message/event-message-content';
import {BaseMessageContent} from '../../../../../data/remote/model/chat/message/base/base-message-content';
import {NgxModalService} from '../../../../../components/ngx-modal/service/ngx-modal.service';
import {ConfirmationRemovingMessageComponent} from '../../../../../module/conversation/confirmation-removing-message/confirmation-removing-message/confirmation-removing-message.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgxButtonType} from '../../../../../components/ngx-button/model/ngx-button-type';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnDestroy {

  public readonly iconEnumClass = IconEnum;
  public readonly baseConversationTypeClass = BaseConversationType;
  public readonly ngxButtonTypeClass = NgxButtonType;

  @ViewChild('logo')
  public logo: ImageComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public messageContent: MessageContent;
  public person: Person;
  public query: PageQuery;
  public conversation: BaseConversation;
  public recipient: Participant;
  public enabled: boolean;
  public selectedMessages: HashSet<Message>;
  public editedMessage: Message;
  public canEditMessage: boolean;
  public readonly participantsTyping: Participant[];

  private _maxMessageDate: Date;
  private _typingTimeout: any;
  private _receiveTypingTimeout: any;
  private _conversationId: number;
  private readonly _messageCreateSubscription: ISubscription;
  private readonly _messageUpdateSubscription: ISubscription;
  private readonly _messageDeleteSubscription: ISubscription;
  private readonly _messageReadSubscription: ISubscription;
  private readonly _typingSubscription: ISubscription;
  private readonly _paramsSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService,
              private _authorizationService: AuthorizationService,
              private _translateService: TranslateService,
              private _modalService: NgbModal,
              private _messageToastrService: MessageToastrService,
              private _templateModalService: TemplateModalService,
              private _ngxModalService: NgxModalService,
              private _router: Router) {
    this._paramsSubscription = this._activatedRoute.params.subscribe(async val => {
      const conversationId = val.id;
      if (conversationId) {
        await this.initialize(conversationId);
      } else {
        await this._router.navigate(['/conversation']);
      }
    });
    this.messageContent = new MessageContent();
    this.query = new PageQuery();
    this._maxMessageDate = new Date();
    this.participantsTyping = [];
    this.selectedMessages = this._conversationService.selectedMessages;
    this.canEditMessage = false;

    this._messageCreateSubscription = this._conversationService.messageCreateHandle.subscribe(x => {
      if (x.message.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
        return;
      }

      if (x.message.sender.person.id != this.person.id) {
        this.readMessageFrom(x.message.created);
        this._conversationService.readMessage(x);
      }

      if (x.message.content.discriminator === BaseMessageContentType.SYSTEM_MESSAGE_CONTENT
        && x.message.sender.person.id != this.person.id) { // Exclude update duplication
        switch ((x.message.content as SystemMessageContent).systemMessageType) {
          case SystemMessageContentType.UPDATE_LOGO:
            this.logo.refresh();
            break;
          case SystemMessageContentType.UPDATE_NAME:
            this.conversation = x.message.content.baseConversation;
        }
      }

      this.ngxVirtualScrollComponent.addItem(x.message);
    });
    this._messageUpdateSubscription = this._conversationService.messageUpdateHandle.subscribe(x => {
      if (x.message.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
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
      if (x.message.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
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
      if (x.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
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
    this._typingSubscription = this._conversationService.typingHandle.subscribe(async participant => {
      if (participant.baseConversation.id != this._conversationId) {
        return;
      }

      const index = this.participantsTyping.findIndex(x => x.id == participant.id);
      if (0 <= index) {
        clearTimeout(this._receiveTypingTimeout);
      } else {
        this.participantsTyping.push(participant);
      }
      this._receiveTypingTimeout = setTimeout(() => {
        this.participantsTyping.splice(this.participantsTyping.indexOf(participant), 1);
      }, 1500);
    });
  }

  public async initialize(conversationId: number): Promise<boolean> {
    return await this._appHelper.tryLoad(async () => {
      this._conversationId = conversationId;

      this.person = await this._authorizationService.getPerson();
      this.conversation = await this._participantRestApiService.getConversation({conversationId: this._conversationId});
      this._messageToastrService.clearToasts(this.conversation.id);
      this.enabled = (await this._participantRestApiService.getMessageNotificationsStatus({conversationId: this._conversationId})).value;
      switch (this.conversation.discriminator) {
        case BaseConversationType.DIALOGUE:
          // Get recipient
          const participantsContainer = await this._participantRestApiService.getParticipants({conversationId: this._conversationId});
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


  ngOnDestroy(): void {
    this._messageCreateSubscription.unsubscribe();
    this._messageUpdateSubscription.unsubscribe();
    this._messageDeleteSubscription.unsubscribe();
    this._messageReadSubscription.unsubscribe();
    this._typingSubscription.unsubscribe();
    this._paramsSubscription.unsubscribe();
    this.selectedMessages.removeAll();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = (await this._participantRestApiService.getMessages({}, query, {conversationId: this._conversationId}));

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
      try {
        this.editedMessage.content = await this._participantRestApiService.updateMessage(this.messageContent, {}, {
          conversationId: this._conversationId,
          messageContentId: this.messageContent.id
        });
        this.cancelEditMessage();
      } catch (e) {
        await this._appHelper.showErrorMessage('sendError');
      }
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
      this._participantStompService.publishConversationTyping({id: this._conversationId});
    }, 150);
  }

  public async editChat() {
    const dialogResult = await this._templateModalService.showEditChat(this.conversation as Chat);
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
    this.editedMessage = undefined;
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
    const ref = this._modalService.open(ModalConfirmDangerComponent);
    const componentInstance = ref.componentInstance as ModalConfirmDangerComponent;
    componentInstance.modalTitle = await this._translateService.get('areYouSure').toPromise();
    componentInstance.confirmBtnTitle = await this._translateService.get('modal.delete').toPromise();
    componentInstance.onConfirm = async () => {
      await this._participantRestApiService.removeAllMessages({conversationId: this._conversationId});
      this.ngxVirtualScrollComponent.items = [];
      this.updateCanEditMessage();
    };
  }

  public updateCanEditMessage() {
    this.canEditMessage = this.selectedMessages.size() == 1
      && this.selectedMessages.data.filter(message => message.content.discriminator === BaseMessageContentType.MESSAGE_CONTENT
        && message.sender.person.id == this.person.id).length == 1;
  }

  public async quitChat() {
    const ref = this._modalService.open(ModalConfirmDangerComponent);
    const componentInstance = ref.componentInstance as ModalConfirmDangerComponent;
    componentInstance.modalTitle = await this._translateService.get('areYouSure').toPromise();
    componentInstance.confirmBtnTitle = await this._translateService.get('quitChat').toPromise();
    componentInstance.onConfirm = async () => {
      await this._participantRestApiService.quitChat({conversationId: this._conversationId});
      await this._router.navigate(['/conversation']);
    };
  }

  public async toggleNotifications() {
    if (this.enabled) {
      await this._participantRestApiService.disableMessageNotifications({conversationId: this._conversationId});
    } else {
      await this._participantRestApiService.enableMessageNotifications({conversationId: this._conversationId});
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
      id: this._conversationId,
      lastDate: this._appHelper.getGmtDate(date)
    });
  }

  private async createMessage<T extends BaseMessageContent>(messageContent: T): Promise<boolean> {
    return await this._appHelper.tryAction('', 'sendError', async () => {
      await this._participantRestApiService.createMessage(messageContent, {}, {conversationId: this._conversationId});
    });
  }

}
