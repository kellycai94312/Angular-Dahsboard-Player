import {Component, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {IconEnum} from '../../../../components/ngx-button/model/icon-enum';
import {BaseConversationType} from '../../../../data/remote/model/chat/conversation/base/base-conversation-type';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgForm} from '@angular/forms';
import {MessageContent} from '../../../../data/remote/model/chat/message/message-content';
import {Person} from '../../../../data/remote/model/person';
import {BaseConversation} from '../../../../data/remote/model/chat/conversation/base/base-conversation';
import {HashSet} from '../../../../data/local/hash-set';
import {Message} from '../../../../data/remote/model/chat/message/message';
import {Participant} from '../../../../data/remote/model/chat/participant';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ConversationService} from '../../../../shared/conversation.service';
import {ParticipantStompService} from '../../../../data/remote/web-socket/participant-stomp.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {MessageToastrService} from '../../../../components/message-toastr/message-toastr.service';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {ConversationModalService} from '../../../../pages/conversation/service/conversation-modal/conversation-modal.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {BaseMessageContentType} from '../../../../data/remote/model/chat/message/base/base-message-content-type';
import {SystemMessageContent} from '../../../../data/remote/model/chat/message/system-message-content';
import {SystemMessageContentType} from '../../../../data/remote/model/chat/message/system-message-content-type';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {ConfirmationRemovingMessageComponent} from '../../confirmation-removing-message/confirmation-removing-message/confirmation-removing-message.component';
import {EventMessageContent} from '../../../../data/remote/model/chat/message/event-message-content';
import {BaseMessageContent} from '../../../../data/remote/model/chat/message/base/base-message-content';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {ImageFormat} from '../../../../data/local/image-format';
import {NgxImageComponent} from '../../../../components/ngx-image/ngx-image/ngx-image.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Router} from '@angular/router';
import {ISelected} from '../../../../data/local/iselected';
import {DialogResult} from '../../../../data/local/dialog-result';
import {BaseTraining} from '../../../../data/remote/model/training/base/base-training';
import {FuseMatSidenavHelperService} from '../../../../../@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

@Component({
  selector: 'app-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConversationViewComponent extends BaseComponent<BaseConversation> implements OnDestroy {

  public readonly iconEnumClass = IconEnum;
  public readonly baseConversationTypeClass = BaseConversationType;
  public readonly fileClass = FileClass;
  public readonly imageTypeClass = ImageType;
  public readonly imageFormatClass = ImageFormat;

  @ViewChild('conversationLogo')
  public ngxImageComponent: NgxImageComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @ViewChild('replyForm')
  public replyForm: NgForm;

  public messageContent: MessageContent;
  public person: Person;
  public enabled: boolean;
  // @deprecated Use selected marker
  public selectedMessages: HashSet<Message>;
  public editedMessage: Message;
  public canEditMessage: boolean;
  public recipient: Participant;
  public conversationName: string;
  public visibleEmojiPicker: boolean;

  private readonly _unsubscribeAll: Subject<void>;

  private _maxMessageDate: Date;
  private _typingTimeout: any;


  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
              private _appHelper: AppHelper,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService,
              private _authorizationService: AuthorizationService,
              private _messageToastrService: MessageToastrService,
              private _templateModalService: TemplateModalService,
              private _conversationModalService: ConversationModalService,
              private _router: Router,
              private _ngxModalService: NgxModalService) {
    super();
    this._unsubscribeAll = new Subject<void>();
    this.messageContent = new MessageContent();
    this._maxMessageDate = new Date();
    this.selectedMessages = new HashSet<Message>();

    this._conversationService.messageCreateHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async x => {
        if (x.message.content.baseConversation.id != this.data.id || !this.ngxVirtualScrollComponent) {
          return;
        }

        if (x.message.sender.person.id != this.person.id) {
          this.readMessageFrom(x.message.created);
          this._conversationService.readMessage(x);
        }

        if (x.message.content.discriminator === BaseMessageContentType.SYSTEM_MESSAGE_CONTENT && x.message.sender.person.id != this.person.id) { // Exclude update duplication
          switch ((x.message.content as SystemMessageContent).systemMessageType) {
            case SystemMessageContentType.UPDATE_LOGO:
              this.ngxImageComponent.refresh();
              break;
            case SystemMessageContentType.UPDATE_NAME:
              this.data = x.message.content.baseConversation;
          }
        }

        await this.ngxVirtualScrollComponent.addItem(x.message);
      });
    this._conversationService.messageUpdateHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        if (x.message.content.baseConversation.id != this.data.id || !this.ngxVirtualScrollComponent) {
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
    this._conversationService.messageDeleteHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        if (x.message.content.baseConversation.id != this.data.id || !this.ngxVirtualScrollComponent) {
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
    this._conversationService.messageReadHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        if (x.content.baseConversation.id != this.data.id || !this.ngxVirtualScrollComponent) {
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

  protected async initializeComponent(data: BaseConversation): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this._appHelper.tryLoad(async () => {
        this.person = await this._appHelper.toPromise(this._authorizationService.personSubject);

        this._messageToastrService.clearToasts(data.id);
        this.enabled = (await this._participantRestApiService.getMessageNotificationsStatus({conversationId: data.id})).value;
        switch (data.discriminator) {
          case BaseConversationType.DIALOGUE:
            // Get recipient
            const participantsContainer = await this._participantRestApiService.getParticipants({conversationId: data.id});
            if (participantsContainer.size > 0) {
              this.recipient = participantsContainer.list[0];
            }
            break;
          default:
            this.recipient = new Participant();
        }
        this.conversationName = this.getConversationName(data, this.recipient);
        await this.ngxVirtualScrollComponent.reset();
      });
    }
    return result;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  protected async onSetData(val: BaseConversation) {
    super.onSetData(val);
    await this.initializeComponent(val);
  }

  public getItems = async (direction: Direction, query: PageQuery) => {
    const pageContainer = (await this._participantRestApiService.getMessages({}, query, {conversationId: this.data.id}));

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

  public sendMessage = async () => {
    if (!this.messageContent.content || !this.messageContent.content.trim()) {
      return;
    }
    this.messageContent.content = this.messageContent.content.trim();

    if (this.editedMessage) {
      // Update message
      await this._appHelper.tryAction('', 'sendError', async () => {
        this.editedMessage.content = await this._participantRestApiService.updateMessage(this.messageContent, {}, {
          conversationId: this.data.id,
          messageContentId: this.messageContent.id
        });
        this.cancelEditMessage();
      });
    } else {
      if (await this.createMessage(this.messageContent)) {
        this.messageContent.content = '';
      }
    }
  };

  public addNewRow() {
    // TODO: Add new row
  }

  public onTyping() {
    clearTimeout(this._typingTimeout);
    this._typingTimeout = setTimeout(() => {
      this._participantStompService.publishConversationTyping({id: this.data.id});
    }, 150);
  }

  public async editChat() {
    const dialogResult = await this._conversationModalService.showEditChat(this.data as Chat);
    if (dialogResult.result) {
      this._appHelper.updateObject(this.data, dialogResult.data);
      this.ngxImageComponent.refresh();
    }
  }

  public toggleSelectMessage = (item: ISelected) => {
    if (item.selected) {
      delete item.selected;
      this.selectedMessages.remove(item as Message);
    } else {
      item.selected = true;
      this.selectedMessages.add(item as Message);
    }
    this.updateCanEditMessage();
  };

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
      component.conversation = this.data;
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
      await this._participantRestApiService.removeAllMessages({conversationId: this.data.id});
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
      await this._participantRestApiService.quitChat({conversationId: this.data.id});
      await this.navigateToConversations();
    }
  }

  public async toggleNotifications() {
    if (this.enabled) {
      await this._participantRestApiService.disableMessageNotifications({conversationId: this.data.id});
    } else {
      await this._participantRestApiService.enableMessageNotifications({conversationId: this.data.id});
    }
    this.enabled = !this.enabled;
  }

  public async onAttachFile() {
    await this.addEvent();
  }

  public onAddEmoji(e: { emoji: any, $event: MouseEvent }) {
    this.messageContent.content = this.messageContent.content || '';
    this.messageContent.content += e.emoji.native;
  }

  public onToggleEmojiPicker() {
    this.visibleEmojiPicker = !this.visibleEmojiPicker;
  }

  public onToggleConversations() {
    this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
  }

  private readMessageFrom(date: Date): void {
    this._participantStompService.publishConversationRead({
      id: this.data.id,
      lastDate: this._appHelper.getGmtDate(date)
    });
  }

  private async createMessage<T extends BaseMessageContent>(messageContent: T): Promise<boolean> {
    return await this._appHelper.tryAction('', 'sendError', async () => {
      await this._participantRestApiService.createMessage(messageContent, {}, {conversationId: this.data.id});
    });
  }

  private async navigateToConversations() {
    await this._router.navigate(['/conversation']);
  }

  private getConversationName(val: BaseConversation, recipient: Participant): string {
    if (val.discriminator === BaseConversationType.DIALOGUE && recipient.person) {
      return this._appHelper.getPersonFullName(recipient.person);
    }
    return (val as Chat).name;
  }

  private async addEvent(): Promise<DialogResult<BaseTraining>> {
    const dialogResult = await this._templateModalService.showEditEventModal(null, null, null, this.data, true);
    if (dialogResult.result) {
      const message = new EventMessageContent();
      message.training = dialogResult.data;
      await this.createMessage(message);
    }
    return dialogResult;
  }

}
