import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppHelper} from '../../../utils/app-helper';
import {ISubscription} from 'rxjs/Subscription';
import {ConversationService} from '../../../shared/conversation.service';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {ParticipantStompService} from '../../../data/remote/web-socket/participant-stomp.service';
import {Message} from '../../../data/remote/model/chat/message/message';
import {Person} from '../../../data/remote/model/person';
import {Participant} from '../../../data/remote/model/chat/participant';
import {MessageContent} from '../../../data/remote/model/chat/message/message-content';
import {BaseConversationType} from '../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {BaseConversation} from '../../../data/remote/model/chat/conversation/base/base-conversation';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChatModalSettingsComponent} from '../chat-modal/chat-modal-settings/chat-modal-settings.component';
import {AuthorizationService} from '../../../shared/authorization.service';
import {ChatModalParticipantsComponent} from '../chat-modal/chat-modal-participants/chat-modal-participants.component';
import {ImageComponent} from '../../../components/image/image.component';
import {Chat} from '../../../data/remote/model/chat/conversation/chat';
import {HashSet} from '../../../data/local/hash-set';
import {ChatModalDeleteMessageConfirmComponent} from '../chat-modal/chat-modal-delete-message-confirm/chat-modal-delete-message-confirm.component';
import {ListRequest} from '../../../data/remote/request/list-request';
import {IdRequest} from '../../../data/remote/request/id-request';
import {ModalConfirmDangerComponent} from '../../../components/modal-confirm/modal-confirm-danger.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit, OnDestroy {

  @ViewChild('logo')
  public logo: ImageComponent;
  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public messageContent: MessageContent;
  public person: Person;
  public query: PageQuery;
  private _maxMessageDate: Date;
  private _typingTimeout: any;
  private _receiveTypingTimeout: any;

  public readonly participantsTyping: Participant[];
  private readonly _conversationId: number;
  private readonly _messageCreateSubscription: ISubscription;
  private readonly _messageUpdateSubscription: ISubscription;
  private readonly _messageDeleteSubscription: ISubscription;
  private readonly _messageReadSubscription: ISubscription;
  private readonly _typingSubscription: ISubscription;

  public conversation: BaseConversation;
  public recipient: Participant;
  public enabled: boolean;
  public selectedMessages: HashSet<Message>;
  public editedMessage: Message;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService,
              private _authorizationService: AuthorizationService,
              private _translateService: TranslateService,
              private _modalService: NgbModal,
              private _router: Router) {
    this._conversationId = this._activatedRoute.snapshot.params.id;
    this.messageContent = new MessageContent();
    this.query = new PageQuery();
    this._maxMessageDate = new Date();
    this.participantsTyping = [];
    this.selectedMessages = new HashSet<Message>();

    this._messageCreateSubscription = this._conversationService.messageCreateHandle.subscribe(x => {
      if (x.message.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
        return;
      }

      this.readMessageFrom(x.message.created);
      x.message.read = true;
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

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();
    try {
      this.conversation = await this._participantRestApiService.getConversation({conversationId: this._conversationId});
      this.enabled = (await this._participantRestApiService.getMessageNotificationsStatus({conversationId: this._conversationId})).value;
      switch (this.conversation.discriminator) {
        case BaseConversationType.DIALOGUE:
          //get recipient
          const participantsContainer = await this._participantRestApiService.getParticipants({conversationId: this._conversationId});
          if (participantsContainer.size > 0) {
            this.recipient = participantsContainer.list[0];
          }
          break;
        default:
          this.recipient = new Participant();
      }
    } catch (e) {
      await this._router.navigate(['/conversation']);
    }
    await this.ngxVirtualScrollComponent.reset();
  }

  ngOnDestroy(): void {
    this._messageCreateSubscription.unsubscribe();
    this._messageUpdateSubscription.unsubscribe();
    this._messageDeleteSubscription.unsubscribe();
    this._messageReadSubscription.unsubscribe();
    this._typingSubscription.unsubscribe();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = (await this._participantRestApiService.getMessages({}, query, {conversationId: this._conversationId}));

    let lastUnreadMessage: Date;
    pageContainer.list = pageContainer.list.map(x => {
      if (x.receiver.person.id == this.person.id && !x.read) {
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
      //update message
      try {
        this.editedMessage.content = await this._participantRestApiService.updateMessage(this.messageContent, {}, {conversationId: this._conversationId, messageContentId: this.messageContent.id});
        this.cancelEditMessage();
        this.messageContent.content = null;
      } catch (e) {
        await this._appHelper.showErrorMessage('sendError');
      }
    } else {
      //create message
      try {
        const message = await this._participantRestApiService.createMessage(this.messageContent, {}, {conversationId: this._conversationId});
        this.addSendMessageInList(message);
        this.messageContent.content = null;

        // TODO: Optimize read message algorithm!
        this.readMessageFrom(message.content.created);
      } catch (e) {
        await this._appHelper.showErrorMessage('sendError');
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

  public editParticipants() {
    const ref = this._modalService.open(ChatModalParticipantsComponent, {size: 'lg'});
    ref.componentInstance.chat = this.conversation;
  }

  public editChat() {
    const ref = this._modalService.open(ChatModalSettingsComponent, {size: 'lg'});
    ref.componentInstance.chat = Object.assign({}, this.conversation);
    ref.componentInstance.chatChange = (chat: Chat) => {
      this.conversation = chat;
    };
    ref.componentInstance.logoChange = () => {
      this.logo.refresh();
    };
  }

  public toggleSelectMessage = (message: Message) => {
    if (this.isMessageSelected(message)) {
      this.selectedMessages.remove(message);
    } else {
      this.selectedMessages.add(message);
    }
  };

  public isMessageSelected(message: Message) {
    return this.selectedMessages.contains(message);
  }

  public editMessage = (message: Message) => {
    this.editedMessage = message;
    this.messageContent = Object.assign({}, message.content as MessageContent);
  };

  public cancelEditMessage() {
    this.editedMessage = undefined;
    this.messageContent = new MessageContent();
  }

  public async deleteSelectedMessages() {
    const messages: Message[] = this.selectedMessages.data;
    const ref = this._modalService.open(ChatModalDeleteMessageConfirmComponent);
    ref.componentInstance.messages = messages;
    ref.componentInstance.onDelete = async (deleteForReceiver: boolean) => {
      const listRequest = new ListRequest(messages.map(message => new IdRequest(message.content.id)));
      await this._participantRestApiService.removeMessages(listRequest, {deleteForReceiver: deleteForReceiver}, {conversationId: this._conversationId});
      //fixme remove from collection
      this.selectedMessages.removeAll();
    };
  }

  public async deleteMessages() {
    const ref = this._modalService.open(ModalConfirmDangerComponent);
    ref.componentInstance.modalTitle = await this._translateService.get('areYouSure').toPromise();
    ref.componentInstance.dangerBtnTitle = await this._translateService.get('modal.delete').toPromise();
    ref.componentInstance.onConfirm = async () => {
      await this._participantRestApiService.removeAllMessages({conversationId: this._conversationId});
      //fixme remove from collection
    };
  }

  public async quitChat() {
    const ref = this._modalService.open(ModalConfirmDangerComponent);
    ref.componentInstance.modalTitle = await this._translateService.get('areYouSure').toPromise();
    ref.componentInstance.dangerBtnTitle = await this._translateService.get('quitChat').toPromise();
    ref.componentInstance.onConfirm = async () => {
      await this._participantRestApiService.quitChat({conversationId: this._conversationId});
      await this._router.navigate(['/conversation']);
    };
  }

  public async deleteChat() {
    const ref = this._modalService.open(ModalConfirmDangerComponent);
    ref.componentInstance.modalTitle = await this._translateService.get('areYouSure').toPromise();
    ref.componentInstance.dangerBtnTitle = await this._translateService.get('modal.delete').toPromise();
    ref.componentInstance.onConfirm = async () => {
      await this._participantRestApiService.deleteChat({conversationId: this._conversationId});
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

  private addSendMessageInList(message: Message) {
    this.ngxVirtualScrollComponent.addItem(message, true);
  }

  private readMessageFrom(date: Date): void {
    this._participantStompService.publishConversationRead({
      id: this._conversationId,
      lastDate: this._appHelper.getGmtDate(date)
    });
  }

}
