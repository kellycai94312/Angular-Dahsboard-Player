import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {AppHelper} from '../../../utils/app-helper';
import {ISubscription} from 'rxjs/Subscription';
import {ConversationService} from '../../../shared/conversation.service';
import {NgxVirtualScrollComponent} from '../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {ParticipantStompService} from '../../../data/remote/web-socket/participant-stomp.service';
import {Message} from '../../../data/remote/model/chat/message/message';
import {Person} from '../../../data/remote/model/person';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Participant} from '../../../data/remote/model/chat/participant';
import {MessageContent} from '../../../data/remote/model/chat/message/message-content';

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

  private readonly _messageSubscription: ISubscription;
  private readonly _readMessageSubscription: ISubscription;
  private person: Person;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService,
              private _authorizationService: AuthorizationService) {
    this.messageContent = new MessageContent();
    this.query = new PageQuery();
    this._maxMessageDate = new Date();
    this._messageSubscription = this._conversationService.messageHandle.subscribe(x => {
      this.readMessageFrom(x.message.created);
      x.message.read = true;
      this.ngxVirtualScrollComponent.addItem(x.message);
    });
    this._readMessageSubscription = this._conversationService.readMessageHandle.subscribe(x => {
      if (!this.ngxVirtualScrollComponent) {
        return;
      }

      const items: Array<Message> = this.ngxVirtualScrollComponent.items;
      // TODO: Optimize read message algorithm!
      for (let i = 0; i < items.length; i++) {
        if (items[i].content.id == x.message.content.id) {
          items[i] = x.message;
          return;
        }
      }
    });
  }

  async ngOnInit() {
    this._conversationId = this._activatedRoute.snapshot.params.id;
    this.person = await this._authorizationService.getPerson();
  }

  ngOnDestroy(): void {
    this._messageSubscription.unsubscribe();
    this._readMessageSubscription.unsubscribe();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = (await this._participantRestApiService.getMessages({}, query, {conversationId: this._conversationId}));
    // TODO: Optimize read message algorithm!
    this.readMessageFrom(new Date());
    pageContainer.list = pageContainer.list.map(x => {
      if (x.receiver.person.id == this.person.id) {
        x.read = true;
      }
      return x;
    });
    return pageContainer;
  };

  public sendMessage: Function = async () => {
    if (!this.messageContent.content || !this.messageContent.content.trim()) {
      return;
    }

    try {
      const messageContent = await this._participantRestApiService.createMessage(this.messageContent, {}, {conversationId: this._conversationId});
      this.messageContent.content = null;

      this.addSendMessageInList(messageContent);
      // TODO: Optimize read message algorithm!
      this.readMessageFrom(new Date());
    } catch (e) {
      await this._appHelper.showErrorMessage('sendError');
    }
  };

  private addSendMessageInList(messageContent: MessageContent) {
    const participant = new Participant();
    participant.person = this.person;

    const message = new Message();
    message.sender = participant;
    message.content = messageContent;

    this.ngxVirtualScrollComponent.addItem(message, true);
  }

  private readMessageFrom(date: Date): void {
    this._participantStompService.publishConversationRead({
      id: this._conversationId,
      lastDate: this._appHelper.getGmtDate(date)
    });
  }

  public addNewRow() {
    // TODO: Add new row
  }

}
