import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-conversations-page',
  templateUrl: './conversations-page.component.html',
  styleUrls: ['./conversations-page.component.scss']
})
export class ConversationsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('searchInput')
  public searchInputElementRef: ElementRef;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public query: PageQuery;

  private _searchInputSubscription: ISubscription;
  private readonly _messageSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _conversationService: ConversationService) {
    this.query = new PageQuery();

    this._messageSubscription = this._conversationService.messageHandle.subscribe(value => {
      if (!this.ngxVirtualScrollComponent) {
        return;
      }

      const items: Array<MessageWrapper> = this.ngxVirtualScrollComponent.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].message.content.baseConversation.id == value.message.content.baseConversation.id) {
          items.splice(i, 1);
          break;
        }
      }
      items.unshift(value);
    });
  }

  ngAfterViewInit(): void {
    this._searchInputSubscription = Observable.fromEvent(this.searchInputElementRef.nativeElement, 'keyup')
      .debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async (event: any) => {
        this.query.name = event.target.value;
        await this.resetItems();
      });
  }

  ngOnDestroy(): void {
    this._searchInputSubscription.unsubscribe();
    this._messageSubscription.unsubscribe();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getActiveMessages(query);
  };

  private async resetItems(): Promise<void> {
    await this.ngxVirtualScrollComponent.reset();
  }

}
