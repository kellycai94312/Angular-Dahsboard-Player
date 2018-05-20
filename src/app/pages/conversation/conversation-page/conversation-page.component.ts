import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {MessageContent} from '../../../data/remote/model/chat/message/base/message-content';
import {AppHelper} from '../../../utils/app-helper';
import {ISubscription} from 'rxjs/Subscription';
import {ConversationService} from '../../../shared/conversation.service';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {ParticipantStompService} from '../../../data/remote/web-socket/participant-stomp.service';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit, OnDestroy {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public messageContent: MessageContent;
  public query: PageQuery;

  private _conversationId: number;
  private _maxMessageDate: Date;

  private readonly _conversationServiceSubscription: ISubscription;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService) {
    this.messageContent = new MessageContent();
    this.query = new PageQuery();
    this._maxMessageDate = new Date();
    this._conversationServiceSubscription = this._conversationService.messageHandle.subscribe(x => {
      this.ngxVirtualScrollComponent.addItem(x.message);

      this._participantStompService.publishConversationRead({
        id: this._conversationId,
        lastDate: this._appHelper.getGmtDate(x.message.created)
      });
    });
  }

  ngOnInit() {
    this._conversationId = this._activatedRoute.snapshot.params.id;
  }

  ngOnDestroy(): void {
    this._conversationServiceSubscription.unsubscribe();
  }


  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getMessages({}, query, {conversationId: this._conversationId});
    // TODO: Get max date
    // for (let i = 0; i < pageContainer.list.length; i++) {
    //   this._maxMessageDate = new Date(Math.max(this._maxMessageDate.getTime(), pageContainer.list[i].created.getTime()));
    // }
    return pageContainer;
  };

  public sendMessage: Function = async () => {
    if (!this.messageContent.content || !this.messageContent.content.trim()) {
      return;
    }

    try {
      await this._participantRestApiService.createMessage(this.messageContent, {}, {conversationId: this._conversationId});
      this.messageContent.content = null;
    } catch (e) {
      await this._appHelper.showErrorMessage('sendError');
    }
  };

  public addNewRow() {
    // TODO: Add new row
  }

}
