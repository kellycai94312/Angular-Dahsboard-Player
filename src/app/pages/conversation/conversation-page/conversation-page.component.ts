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
  private _maxMessageDate: Date;
  private _typingTimeout: any;
  private _receiveTypingTimeout: any;

  public readonly participantsTyping: Participant[];
  private readonly _conversationId: number;
  private readonly _messageCreateSubscription: ISubscription;
  private readonly _messageUpdateSubscription: ISubscription;
  private readonly _messageDeleteSubscription: ISubscription;
  private readonly _messageReadSubscription: ISubscription;
  private readonly _typingSubscription: ISubscription;

  private person: Person;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper,
              private _conversationService: ConversationService,
              private _participantStompService: ParticipantStompService,
              private _authorizationService: AuthorizationService) {
    this._conversationId = this._activatedRoute.snapshot.params.id;
    this.messageContent = new MessageContent();
    this.query = new PageQuery();
    this._maxMessageDate = new Date();
    this.participantsTyping = [];

    this._messageCreateSubscription = this._conversationService.messageCreateHandle.subscribe(x => {
      if (x.message.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
        return;
      }

      this.readMessageFrom(x.message.created);
      x.message.read = true;
      this.ngxVirtualScrollComponent.addItem(x.message);
    });
    this._messageUpdateSubscription = this._conversationService.messageUpdateHandle.subscribe(x => {
      if (x.message.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
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
    this._messageDeleteSubscription = this._conversationService.messageDeleteHandle.subscribe(x => {
      if (x.message.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
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
    this._messageReadSubscription = this._conversationService.messageReadHandle.subscribe(x => {
      if (x.content.baseConversation.id != this._conversationId || !this.ngxVirtualScrollComponent) {
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
    this._typingSubscription = this._conversationService.typingHandle.subscribe(async participant => {
      if (participant.baseConversation.id != this._conversationId) {
        return;
      }

      const index = this.participantsTyping.findIndex(x => x.id == participant.id);
      if (0 <= index) {
        clearTimeout(this._receiveTypingTimeout);
      } else {
        this.participantsTyping.push(participant);
      }
      this._receiveTypingTimeout = setTimeout(() => {
        this.participantsTyping.splice(this.participantsTyping.indexOf(participant), 1);
      }, 1500);
    });
  }

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();
    await this.ngxVirtualScrollComponent.reset();
  }

  ngOnDestroy(): void {
    this._messageCreateSubscription.unsubscribe();
    this._messageUpdateSubscription.unsubscribe();
    this._messageDeleteSubscription.unsubscribe();
    this._messageReadSubscription.unsubscribe();
    this._typingSubscription.unsubscribe();
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    const pageContainer = (await this._participantRestApiService.getMessages({}, query, {conversationId: this._conversationId}));

    let lastUnreadMessage: Date;
    pageContainer.list = pageContainer.list.map(x => {
      if (x.receiver.person.id == this.person.id && !x.read) {
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

  public sendMessage: Function = async () => {
    if (!this.messageContent.content || !this.messageContent.content.trim()) {
      return;
    }
    this.messageContent.content = this.messageContent.content.trim();
    try {
      const messageContent = await this._participantRestApiService.createMessage(this.messageContent, {}, {conversationId: this._conversationId});
      this.addSendMessageInList(messageContent);
      this.messageContent.content = null;

      // TODO: Optimize read message algorithm!
      this.readMessageFrom(messageContent.created);
    } catch (e) {
      await this._appHelper.showErrorMessage('sendError');
    }
  };

  public addNewRow() {
    // TODO: Add new row
  }

  public onTyping() {
    clearTimeout(this._typingTimeout);
    this._typingTimeout = setTimeout(() => {
      this._participantStompService.publishConversationTyping({id: this._conversationId});
    }, 150);
  }

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

}
