import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ConversationService} from '../../../../shared/conversation.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ConversationWrapper} from '../../../../data/local/conversation-wrapper';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {MessageWrapper} from '../../../../data/remote/bean/wrapper/message-wrapper';
import {ConversationModalService} from '../../../../pages/conversation/service/conversation-modal/conversation-modal.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public preview: boolean;

  @Input()
  public visibleHeader: boolean;

  @Output()
  public selectItemChange: EventEmitter<ConversationWrapper>;

  public query: PageQuery;

  private readonly _unsubscribeAll: Subject<void>;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _conversationService: ConversationService,
              private _conversationModalService: ConversationModalService,
              private _appHelper: AppHelper) {
    this.query = new PageQuery();
    this._unsubscribeAll = new Subject<void>();

    this.selectItemChange = new EventEmitter<ConversationWrapper>();

    this._conversationService.messageCreateHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        if (!this.ngxVirtualScrollComponent) {
          return;
        }
        this.updateItem(x);
      });
    this._conversationService.messageUpdateHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
        if (!this.ngxVirtualScrollComponent) {
          return;
        }
        const messageWrapper = this.findMessageWrapper(x);
        if (messageWrapper) {
          x.unread = messageWrapper.unread;
          this.updateItem(x);
        }
      });
    this._conversationService.messageReadHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(x => {
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
    this._conversationService.messageDeleteHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async x => {
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
    this._conversationService.typingHandle
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async participant => {
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
    await this.resetItems();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  public async onSearchTextChanged(val: string) {
    if (val) {
      this.query.name = val;
    } else {
      delete this.query.name;
    }
    await this.resetItems();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getActiveMessages(query);
    return this._appHelper.pageContainerConverter(pageContainer, messageWrapper => new ConversationWrapper(messageWrapper));
  };

  public onCreateChat = async () => {
    if (await this._conversationModalService.showEditChat(new Chat())) {
      await this.resetItems();
    }
  };

  public onSelectedItem(val: ConversationWrapper) {
    this.selectItemChange.emit(val);
  }

  private async resetItems(): Promise<void> {
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
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
