import {Component, OnInit} from '@angular/core';
import {Direction} from 'ngx-bootstrap/carousel/carousel.component';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {ActivatedRoute} from '@angular/router';
import {MessageContent} from '../../../data/remote/model/chat/message/base/message-content';
import {AppHelper} from '../../../utils/app-helper';

@Component({
  selector: 'app-conversation-page',
  templateUrl: './conversation-page.component.html',
  styleUrls: ['./conversation-page.component.scss']
})
export class ConversationPageComponent implements OnInit {

  public messageContent: MessageContent;
  public query: PageQuery;

  private conversationId: number;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _activatedRoute: ActivatedRoute,
              private _appHelper: AppHelper) {
    this.messageContent = new MessageContent();
    this.query = new PageQuery();
  }

  ngOnInit() {
    this.conversationId = this._activatedRoute.snapshot.params.id;
  }

  public getItems: Function = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getMessages({}, query, {conversationId: this.conversationId});
  };

  public sendMessage: Function = async () => {
    if (!this.messageContent.name || !this.messageContent.name.trim()) {
      return;
    }

    try {
      await this._participantRestApiService.createMessage(this.messageContent, {}, {conversationId: this.conversationId});
      this.messageContent.name = null;
    } catch (e) {
      await this._appHelper.showErrorMessage('sendError');
    }
  };

  public addNewRow() {
    // TODO: Add new row
  }

}
