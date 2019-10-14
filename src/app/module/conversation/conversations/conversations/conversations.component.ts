import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Direction } from 'app/components/ngx-virtual-scroll/model/direction';
import { NgxVirtualScrollComponent } from 'app/components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import { ConversationWrapper } from 'app/data/local/conversation-wrapper';
import { PropertyConstant } from 'app/data/local/property-constant';
import { MessageWrapper } from 'app/data/remote/bean/wrapper/message-wrapper';
import { Chat } from 'app/data/remote/model/chat';
import { ConversationApiService } from 'app/data/remote/rest-api/api';
import { PageQuery } from 'app/data/remote/rest-api/page-query';
import { NgxInput } from 'app/module/ngx/ngx-input';
import { ConversationModalService } from 'app/pages/conversation/service/conversation-modal/conversation-modal.service';
import { ConversationService } from 'app/shared/conversation.service';
import { AppHelper } from 'app/utils/app-helper';
import { debounceTime, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit, OnDestroy {

  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild(NgxVirtualScrollComponent, {static: false})
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public preview: boolean;

  @Input()
  public visibleHeader: boolean;

  @Input()
  public selectedItem: ConversationWrapper;

  @Output()
  public readonly selectItemChange = new EventEmitter<ConversationWrapper>();

  public query = new PageQuery();
  public searchNgxInput: NgxInput;
  private _notDestroyed = true;

  constructor(private _conversationApiService: ConversationApiService,
              private _conversationService: ConversationService,
              private _conversationModalService: ConversationModalService,
              private _appHelper: AppHelper) {
  }

  public async ngOnInit(): Promise<void> {
    this.searchNgxInput = new NgxInput();
    this.searchNgxInput.labelTranslation = 'search';
    this.searchNgxInput.control.valueChanges
      .pipe(
        takeWhile(() => this._notDestroyed),
        debounceTime(PropertyConstant.searchDebounceTime)
      )
      .subscribe(async (value) => {
        this.query.name = value;
        await this.resetItems();
      });

    this._conversationService.messageCreate$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        this._updateItem(x);
      });
    this._conversationService.messageUpdate$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        const messageWrapper = this._findMessageWrapper(x);
        if (messageWrapper) {
          x.unread = messageWrapper.unread;
          this._updateItem(x);
        }
      });
    this._conversationService.messageRead$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        const items: Array<ConversationWrapper> = this.ngxVirtualScrollComponent.items;
        for (let i = 0; i < items.length; i++) {
          if (items[i].messageWrapper.message.content.baseConversation.id == x.content.baseConversation.id) {
            items[i].messageWrapper.message = x;
            break;
          }
        }
      });
    this._conversationService.messageDelete$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async x => {
        const messageWrapper = this._findMessageWrapper(x);
        if (messageWrapper) {
          if (x.previousMessage) {
            const updatedMessageWrapper = Object.assign({}, x);
            updatedMessageWrapper.message = updatedMessageWrapper.previousMessage;
            this._replaceItem(x, updatedMessageWrapper);
          } else {
            this._removeItem(x);
          }
        }
      });
    this._conversationService.typing$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async participant => {
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
    this._conversationService.unreadTotal$
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async () => {
        await this.resetItems();
      });

    await this.resetItems();
  }

  public ngOnDestroy(): void {
    delete this._notDestroyed;
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = await this._conversationApiService.getActiveMessages(query).toPromise();
    return this._appHelper.pageContainerConverter(pageContainer, messageWrapper => new ConversationWrapper(messageWrapper));
  };

  public async onAddConversation(): Promise<void> {
    if (await this._conversationModalService.showEditChat(new Chat())) {
      await this.resetItems();
    }
  }

  public onSelectedItem(val: ConversationWrapper): void {
    this.selectedItem = val;
    this.selectItemChange.emit(val);
  }

  private async resetItems(): Promise<void> {
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
  }

  private _addItem(messageWrapper: MessageWrapper) {
    this.ngxVirtualScrollComponent.items.unshift(new ConversationWrapper(messageWrapper));
  }

  private _updateItem(messageWrapper: MessageWrapper): void {
    this._removeItem(messageWrapper);
    this._addItem(messageWrapper);
  }

  private _replaceItem(src: MessageWrapper, dst: MessageWrapper): void {
    this._removeItem(src);
    this._addItem(dst);
  }

  private _removeItem(messageWrapper: MessageWrapper): void {
    const items: ConversationWrapper[] = this.ngxVirtualScrollComponent.items;
    const itemIndex = items.findIndex(x => x.messageWrapper.message.content.baseConversation.id == messageWrapper.message.content.baseConversation.id);
    if (itemIndex > -1) {
      items.splice(itemIndex, 1);
    }
  }

  private _findMessageWrapper(x: MessageWrapper): MessageWrapper {
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
    return void 0;
  }

}
