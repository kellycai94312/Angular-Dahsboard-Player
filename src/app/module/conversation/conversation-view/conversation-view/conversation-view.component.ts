import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IconEnum} from '../../../../components/ngx-button/model/icon-enum';
import {BaseConversation, ConversationType} from '../../../../data/remote/model/chat/conversation/base';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgForm} from '@angular/forms';
import {Message, MessageContent, SystemMessageContent, SystemMessageType} from '../../../../data/remote/model/chat/message';
import {Person} from '../../../../data/remote/model/person';
import {HashSet} from '../../../../data/local/hash-set';
import {Participant} from '../../../../data/remote/model/chat';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ConversationService} from '../../../../shared/conversation.service';
import {ParticipantStompService} from '../../../../data/remote/web-socket/participant-stomp.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {MessageToastrService} from '../../../../components/message-toastr/message-toastr.service';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {ConversationModalService} from '../../../../pages/conversation/service/conversation-modal/conversation-modal.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
import {BaseMessageContent, MessageContentType} from '../../../../data/remote/model/chat/message/base';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Chat, Dialogue} from '../../../../data/remote/model/chat/conversation';
import {ConfirmationRemovingMessageComponent} from '../../confirmation-removing-message/confirmation-removing-message/confirmation-removing-message.component';
import {ImageType} from '../../../../data/remote/model/file/image/image-type';
import {NgxImageComponent} from '../../../../components/ngx-image/ngx-image/ngx-image.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {BaseComponent} from '../../../../data/local/component/base/base-component';
import {Router} from '@angular/router';
import {ISelected} from '../../../../data/local/iselected';
import {DialogResult} from '../../../../data/local/dialog-result';
import {FuseMatSidenavHelperService} from '../../../../../@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {PollWindowService} from '../../../../services/windows/poll-window/poll-window.service';
import {ConversationApiService} from '../../../../data/remote/rest-api/api/conversation/conversation-api.service';
import {PollApiService} from '../../../../data/remote/rest-api/api/poll/poll-api.service';
import {MessageContentAppliedPoll} from '../../../../data/remote/model/poll/applied/message-content-applied-poll';

@Component({
  selector: 'app-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.scss']
})
export class ConversationViewComponent extends BaseComponent<BaseConversation> implements OnInit, OnDestroy {

  public readonly iconEnumClass = IconEnum;
  public readonly baseConversationTypeClass = ConversationType;
  public readonly fileClass = FileClass;
  public readonly imageTypeClass = ImageType;

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
  public visibleEmojiPicker: boolean;
  public messageNgxInput: NgxInput;

  private readonly _unsubscribeAll: Subject<void>;

  private _maxMessageDate: Date;
  private _typingTimeout: any;


  constructor(private _pollWindowService: PollWindowService,
              private _pollApiService: PollApiService,
              private _conversationApiService: ConversationApiService,
              private _participantRestApiService: ParticipantRestApiService,
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

        if (x.message.content.discriminator === MessageContentType.SYSTEM_MESSAGE_CONTENT && x.message.sender.person.id != this.person.id) { // Exclude update duplication
          switch ((x.message.content as SystemMessageContent).systemMessageType) {
            case SystemMessageType.UPDATE_LOGO:
              this.ngxImageComponent.refresh();
              break;
            case SystemMessageType.UPDATE_NAME:
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
          case ConversationType.DIALOGUE:
            // Get recipient
            const participantsContainer = await this._participantRestApiService.getParticipants({conversationId: data.id});
            if (participantsContainer.size > 0) {
              this.recipient = participantsContainer.list[0];
            }
            break;
          default:
            this.recipient = new Participant();
        }

        this.messageNgxInput = new NgxInput();
        this.messageNgxInput.type = NgxInputType.TEXTAREA;

        await this.ngxVirtualScrollComponent.reset();
      });
    }
    return result;
  }

  public get canEditChat(): boolean {
    return this.data instanceof Chat && this.person && this.data.owner.id == this.person.user.id;
  }

  public get canQuitChat(): boolean {
    return this.data instanceof Chat && this.person && this.data.owner.id != this.person.user.id;
  }

  public get conversationName(): string {
    if (this.recipient && this.data instanceof Dialogue && this.recipient.person) {
      return this._appHelper.getPersonFullName(this.recipient.person);
    }
    return (this.data as Chat).name;
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

  public updateCanEditMessage() {
    this.canEditMessage = this.selectedMessages.size() == 1
      && this.selectedMessages.data.filter(message => message.content.discriminator === MessageContentType.MESSAGE_CONTENT
        && message.sender.person.id == this.person.id).length == 1;
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


  private async addEvent(): Promise<DialogResult<any>> {
    // TODO: Add event
    // const dialogResult = await this._templateModalService.showEditEventModal(null, null, null, this.data, true);
    // if (dialogResult.result) {
    //   const message = new EventMessageContent();
    //   message.training = dialogResult.data;
    //   await this.createMessage(message);
    // }
    // return dialogResult;
    return {result: false};
  }

  //region Conversation menu

  public async onEditChat() {
    const dialogResult = await this._conversationModalService.showEditChat(this.data as Chat);
    if (dialogResult.result) {
      this._appHelper.updateObject(this.data, dialogResult.data);
      this.ngxImageComponent.refresh();
    }
  }

  public async onDeleteSelectedMessages(): Promise<void> {
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
  }

  public async onToggleNotifications() {
    if (this.enabled) {
      await this._participantRestApiService.disableMessageNotifications({conversationId: this.data.id});
    } else {
      await this._participantRestApiService.enableMessageNotifications({conversationId: this.data.id});
    }
    this.enabled = !this.enabled;
  }

  public async onClearMessagesHistory() {
    if (await this._templateModalService.showConfirmModal('areYouSure')) {
      await this._participantRestApiService.removeAllMessages({conversationId: this.data.id});
      this.ngxVirtualScrollComponent.items = [];
      this.updateCanEditMessage();
    }
  }

  public async onQuitChat() {
    if (await this._templateModalService.showConfirmModal('areYouSure')) {
      await this._participantRestApiService.quitChat({conversationId: this.data.id});
      await this.navigateToConversations();
    }
  }

  //endregion

  //region Attaching menu

  public async onAttachPoll(): Promise<void> {
    const dialogResult = await this._pollWindowService.openSelectionPollsWindow([], {maxCount: 1});
    if (dialogResult.result) {
      await this._pollApiService.createAppliedPoll(dialogResult.data[0], new MessageContentAppliedPoll()).toPromise();
    }
  }

  public async onAttachEvent(): Promise<void> {

  }

  //endregion

}
