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
import {MessageWrapper} from '../../../data/remote/bean/wrapper/message-wrapper';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChatModalCreateComponent} from '../chat-modal/chat-modal-create/chat-modal-create.component';

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

  // private readonly _messageDeleteSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _conversationService: ConversationService,
              private _modalService: NgbModal) {
    this.query = new PageQuery();
    this._messageCreateSubscription = this._conversationService.messageCreateHandle.subscribe(x => {
      this.updateItem(x);
    });
    this._messageUpdateSubscription = this._conversationService.messageUpdateHandle.subscribe(x => {
      this.updateItem(x);
    });
    this._messageReadSubscription = this._conversationService.messageReadHandle.subscribe(x => {
      if (!this.ngxVirtualScrollComponent) {
        return;
      }

      const items: Array<MessageWrapper> = this.ngxVirtualScrollComponent.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].message.content.baseConversation.id == x.content.baseConversation.id) {
          items[i].message = x;
          break;
        }
      }
    });
    //todo delete subscription
    // this._messageDeleteSubscription = this._conversationService.messageDeleteHandle.subscribe(x => {
    //
    //   //find conversation
    //
    //   if (x.message.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
    //     return;
    //   }
    //
    //   const items: Array<Message> = this.ngxVirtualScrollComponent.items;
    //   // TODO: Optimize read message algorithm!
    //   for (let i = 0; i < items.length; i++) {
    //     if (items[i].content.id == x.message.content.id) {
    //       items.splice(i, 1);
    //       break;
    //     }
    //   }
    // });
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
    this._searchInputSubscription.unsubscribe();
    this._messageCreateSubscription.unsubscribe();
    this._messageUpdateSubscription.unsubscribe();
    this._messageReadSubscription.unsubscribe();
    // this._messageDeleteSubscription.unsubscribe();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getActiveMessages(query);
  };

  public createChat() {
    this._modalService.open(ChatModalCreateComponent, {size: 'lg'});
  }

  private async resetItems(): Promise<void> {
    setTimeout(async () => {
      await this.ngxVirtualScrollComponent.reset();
    });
  }

  private updateItem(messageWrapper: MessageWrapper): void {
    if (!this.ngxVirtualScrollComponent) {
      return;
    }

    const items: Array<MessageWrapper> = this.ngxVirtualScrollComponent.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].message.content.baseConversation.id == messageWrapper.message.content.baseConversation.id) {
        items.splice(i, 1);
        break;
      }
    }
    items.unshift(messageWrapper);
  }

}
