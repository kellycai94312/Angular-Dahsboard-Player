import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

import {PropertyConstant} from '../../../data/local/property-constant';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {ConversationService} from '../../../shared/conversation.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChatModalCreateComponent} from '../chat-modal/chat-modal-create/chat-modal-create.component';
import {AppHelper} from '../../../utils/app-helper';
import {ConversationWrapper} from '../conversation-wrapper';
import {MessageWrapper} from '../../../data/remote/bean/wrapper/message-wrapper';

@Component({
  selector: 'app-conversations-page',
  templateUrl: './conversations-page.component.html',
  styleUrls: ['./conversations-page.component.scss']
})
export class ConversationsPageComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput')
  public searchInputElementRef: ElementRef;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public query: PageQuery;

  private _searchInputSubscription: ISubscription;
  private readonly _messageCreateSubscription: ISubscription;
  private readonly _messageUpdateSubscription: ISubscription;
  private readonly _messageReadSubscription: ISubscription;
  private readonly _messageDeleteSubscription: ISubscription;
  private readonly _typingSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _conversationService: ConversationService,
              private _modalService: NgbModal,
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
    this._searchInputSubscription = Observable.fromEvent(this.searchInputElementRef.nativeElement, 'keyup')
      .debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async (event: any) => {
        this.query.name = event.target.value;
        await this.resetItems();
      });
    await this.resetItems();
  }

  ngOnDestroy(): void {
    if (this._searchInputSubscription) {
      this._searchInputSubscription.unsubscribe();
    }
    if (this._messageCreateSubscription) {
      this._messageCreateSubscription.unsubscribe();
    }
    if (this._messageUpdateSubscription) {
      this._messageUpdateSubscription.unsubscribe();
    }
    if (this._messageReadSubscription) {
      this._messageReadSubscription.unsubscribe();
    }
    if (this._messageDeleteSubscription) {
      this._messageDeleteSubscription.unsubscribe();
    }
    if (this._typingSubscription) {
      this._typingSubscription.unsubscribe();
    }
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getActiveMessages(query);
    return this._appHelper.pageContainerConverter(pageContainer, messageWrapper => new ConversationWrapper(messageWrapper));
  };

  public createChat(): void {
    this._modalService.open(ChatModalCreateComponent, {size: 'lg'});
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
