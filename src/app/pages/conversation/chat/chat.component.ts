import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {ChatService} from 'app/pages/conversation/chat/chat.service';
import {ConversationService} from '../../../shared/conversation.service';
import {BaseConversation} from '../../../data/remote/model/chat/conversation/base/base-conversation';
import {AuthorizationService} from '../../../shared/authorization.service';
import {Person} from '../../../data/remote/model/person';
import {AppHelper} from '../../../utils/app-helper';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit, OnDestroy {

  private readonly _unsubscribeAll: Subject<void>;

  conversation: BaseConversation;
  person: Person;

  constructor(private _chatService: ChatService,
              private _conversationService: ConversationService,
              private _authorizationService: AuthorizationService,
              private _activatedRoute: ActivatedRoute,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this._unsubscribeAll = new Subject<void>();
  }

  async ngOnInit() {
    this.person = await this._appHelper.toPromise(this._authorizationService.personSubject);
    this._chatService.onChatSelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(conversation => {
        this.conversation = conversation;
      });

    this._activatedRoute.params
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async val => {
        const conversationId = val.id;
        if (conversationId) {
          const conversation = await this._participantRestApiService.getConversation({conversationId: conversationId});
          this._chatService.onChatSelected.next(conversation);
        }
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
