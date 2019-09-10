import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseConversation, ConversationType} from '../../../../data/remote/model/chat/conversation/base';
import {FileClass} from '../../../../data/remote/model/file/base/file-class';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {NgForm} from '@angular/forms';
import {Message, MessageContent, MessageContentType, PollMessageContent, SystemMessageContent, SystemMessageType} from '../../../../data/remote/model/chat/message';
import {Person} from '../../../../data/remote/model/person';
import {Participant} from '../../../../data/remote/model/chat';
import {AppHelper} from '../../../../utils/app-helper';
import {ConversationService} from '../../../../shared/conversation.service';
import {ParticipantStompService} from '../../../../data/remote/web-socket/participant-stomp.service';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {MessageToastrService} from '../../../../components/message-toastr/message-toastr.service';
import {TemplateModalService} from '../../../../service/template-modal.service';
import {ConversationModalService} from '../../../../pages/conversation/service/conversation-modal/conversation-modal.service';
import {NgxModalService} from '../../../../components/ngx-modal/service/ngx-modal.service';
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
import {FuseMatSidenavHelperService} from '../../../../../@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';
import {NgxInput} from '../../../ngx/ngx-input/model/ngx-input';
import {NgxInputType} from '../../../ngx/ngx-input/model/ngx-input-type';
import {PollWindowService} from '../../../../services/windows/poll-window/poll-window.service';
import {ConversationApiService} from '../../../../data/remote/rest-api/api/conversation/conversation-api.service';
import {PollApiService} from '../../../../data/remote/rest-api/api/poll/poll-api.service';
import {MessageContentAppliedPoll} from '../../../../data/remote/model/poll/applied/message-content-applied-poll';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-conversation-view',
  templateUrl: './conversation-view.component.html',
  styleUrls: ['./conversation-view.component.scss']
})
export class ConversationViewComponent extends BaseComponent<BaseConversation> implements OnInit, OnDestroy {

  public readonly selectionModel = new SelectionModel<Message>(true);
  public readonly messageNgxInput = new NgxInput();

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
  public editedMessage: Message;
  public recipient: Participant;
  public visibleEmojiPicker: boolean;

  private readonly _unsubscribeAll: Subject<void>;

  private _maxMessageDate: Date;
  private _typingTimeout: any;


  constructor(private _pollWindowService: PollWindowService,
              private _pollApiService: PollApiService,
              private _conversationApiService: ConversationApiService,
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

  //region Getter and setters

  public get canEditMessage(): boolean {
    if (this.selectionModel.selected.length == 1) {
      const message = this.selectionModel.selected[0];
      return message.content.discriminator === MessageContentType.MESSAGE_CONTENT && message.sender.person.id == this.person.id;
    }
    return false;
  }

  public get canEditChat(): boolean {
    return this.data instanceof Chat && this.person && this.data.owner.id == this.person.user.id;
  }

  public get canQuitChat(): boolean {
    return this.data instanceof Chat && this.person && this.data.owner.id != this.person.user.id;
  }

  public get conversationName(): string {
    if (this.data instanceof Dialogue && this.recipient && this.recipient.person) {
      return this._appHelper.getPersonFullName(this.recipient.person);
    }
    return (this.data as Chat).name;
  }

  //endregion

  public async ngOnInit(): Promise<void> {
    await super.ngOnInit();

    this.messageNgxInput.type = NgxInputType.TEXTAREA;
    this.messageNgxInput.textareaAutosize = true;
    delete this.messageNgxInput.getErrorMessage;
  }

  protected async initializeComponent(data: BaseConversation): Promise<boolean> {
    const result = await super.initializeComponent(data);
    if (result) {
      return await this._appHelper.tryLoad(async () => {
        this.person = await this._appHelper.toPromise(this._authorizationService.personSubject);
        this._messageToastrService.clearToasts(data.id);
        this.enabled = await this._conversationApiService.getNotificationsStatus(this.data).toPromise();
        switch (data.discriminator) {
          case ConversationType.DIALOGUE:
            // Get recipient
            const participantsContainer = await this._conversationApiService.getParticipants({conversationId: this.data.id}).toPromise();
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
    const pageContainer = await this._conversationApiService.getMessages(this.data, query).toPromise();

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

  public onTyping() {
    clearTimeout(this._typingTimeout);
    this._typingTimeout = setTimeout(() => {
      this._participantStompService.publishConversationTyping({id: this.data.id});
    }, 150);
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

  //region Conversation menu

  public async onEditChat(): Promise<void> {
    const dialogResult = await this._conversationModalService.showEditChat(this.data as Chat);
    if (dialogResult.result) {
      this._appHelper.updateObject(this.data, dialogResult.data);
      this.ngxImageComponent.refresh();
    }
  }

  public async onDeleteSelectedMessages(): Promise<void> {
    const messages: Message[] = this.selectionModel.selected;
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
              this.selectionModel.clear();
              modal.close();
            }
          }
        }
      ];
    });
  }

  public onEditMessage(): void {
    this.editedMessage = this.selectionModel.selected[0];
    this.messageContent = Object.assign({}, this.editedMessage.content as MessageContent);
    this.messageNgxInput.control.setValue(this.messageContent.content);
  }

  public onToggleNotifications(): void {
    const changeNotifications = this.enabled ? this._conversationApiService.disableNotifications(this.data) : this._conversationApiService.enableNotifications(this.data);
    changeNotifications.subscribe(() => {
      this.enabled = !this.enabled;
    });
  }

  public async onClearMessagesHistory(): Promise<void> {
    if (await this._templateModalService.showConfirmModal('areYouSure')) {
      this._conversationApiService.deleteAllMessages(this.data).subscribe(() => {
        this.ngxVirtualScrollComponent.items = [];
      });
    }
  }

  public async onQuitChat(): Promise<void> {
    if (await this._templateModalService.showConfirmModal('areYouSure')) {
      this._conversationApiService.quitChat(this.data).subscribe(async () => {
        await this._router.navigate(['/conversation']);
      });
    }
  }

  //endregion

  //region Message action

  public onSendMessage(): void {
    const message = this.messageNgxInput.control.value && this.messageNgxInput.control.value.trim();
    if (!message) {
      this.messageNgxInput.control.reset();
      return;
    }
    this.messageContent.content = message;

    if (this.editedMessage) {
      this._conversationApiService.updateMessage(this.data, this.messageContent).subscribe(value => {
        this.editedMessage.content = value;

        const itemIndex = this.ngxVirtualScrollComponent.items.findIndex(x => x.id == this.editedMessage.id);
        if (itemIndex > -1) {
          this.ngxVirtualScrollComponent.items[itemIndex] = this.editedMessage;
        }
        this.onCancelEditMessage();
      });
    } else {
      this._conversationApiService.createMessage(this.data, this.messageContent).subscribe(value => {
        delete this.messageContent.content;
        this.messageNgxInput.control.reset();
      });
    }
  }

  public onCancelEditMessage(): void {
    delete this.editedMessage;
    this.messageContent = new MessageContent();
    this.messageNgxInput.control.reset();
  }

  //endregion

  //region Attaching menu

  public async onAttachPoll(): Promise<void> {
    const dialogResult = await this._pollWindowService.openSelectionPollsWindow([], {maxCount: 1});
    if (dialogResult.result) {
      const pollMessageContent = new PollMessageContent();
      const message = await this._conversationApiService.createMessage(this.data, pollMessageContent).toPromise();
      const messageContentAppliedPoll = new MessageContentAppliedPoll();
      messageContentAppliedPoll.messageContent = message.content as PollMessageContent;
      await this._pollApiService.createAppliedPoll(dialogResult.data[0], messageContentAppliedPoll).toPromise();
    }
  }

  public async onAttachEvent(): Promise<void> {

  }

  //endregion

}
