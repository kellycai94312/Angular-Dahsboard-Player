import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ConversationService} from '../../../../shared/conversation.service';
import {AppHelper} from '../../../../utils/app-helper';
import {ConversationWrapper} from '../../../../data/local/conversation-wrapper';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {Chat} from '../../../../data/remote/model/chat/conversation';
import {MessageWrapper} from '../../../../data/remote/bean/wrapper/message-wrapper';
import {ConversationModalService} from '../../../../pages/conversation/service/conversation-modal/conversation-modal.service';
import {takeWhile} from 'rxjs/operators';
import {ConversationApiService} from '../../../../data/remote/rest-api/api/conversation/conversation-api.service';

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
  public readonly selectItemChange = new EventEmitter<ConversationWrapper>();

  public query = new PageQuery();
  private _notDestroyed = true;

  constructor(private _conversationApiService: ConversationApiService,
              private _conversationService: ConversationService,
              private _conversationModalService: ConversationModalService,
              private _appHelper: AppHelper) {
  }

  async ngOnInit() {
    this._conversationService.messageCreateHandle
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        this.updateItem(x);
      });
    this._conversationService.messageUpdateHandle
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(x => {
        const messageWrapper = this.findMessageWrapper(x);
        if (messageWrapper) {
          x.unread = messageWrapper.unread;
          this.updateItem(x);
        }
      });
    this._conversationService.messageReadHandle
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
    this._conversationService.messageDeleteHandle
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async x => {
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
    this._conversationService.unreadTotalHandle
      .pipe(takeWhile(() => this._notDestroyed))
      .subscribe(async () => {
        await this.resetItems();
      });

    await this.resetItems();
  }

  ngOnDestroy(): void {
    this._notDestroyed = false;
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
    const pageContainer = await this._conversationApiService.getActiveMessages(query).toPromise();
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
