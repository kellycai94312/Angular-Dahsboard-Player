import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../../../data/remote/model/person';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ConversationQuery} from '../../../../data/remote/rest-api/query/conversation-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {HashSet} from '../../../../data/local/hash-set';
import {ParticipantWrapper} from './participant-wrapper';
import {DxTextBoxComponent} from 'devextreme-angular';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {ListRequest} from '../../../../data/remote/request/list-request';

@Component({
  selector: 'app-chat-modal-add-participants',
  templateUrl: './chat-modal-participants.component.html',
  styleUrls: ['./chat-modal-participants.component.scss']
})
export class ChatModalParticipantsComponent implements OnInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;
  public readonly selectedPersons: HashSet<ParticipantWrapper>;
  public readonly persons: HashSet<ParticipantWrapper>;
  public active: ParticipantWrapper;
  public person: Person;

  @Input()
  chat: Chat;

  private readonly _conversationQuery: ConversationQuery;
  private _searchText: string;

  constructor(public modal: NgbActiveModal,
              private _authorizationService: AuthorizationService,
              private _participantRestApiService: ParticipantRestApiService) {
    this.selectedPersons = new HashSet<ParticipantWrapper>();
    this.persons = new HashSet<ParticipantWrapper>();
    this._conversationQuery = new ConversationQuery();
  }

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();
    this.selectedPersons.addAll(await this.getCurrentParticipants());
    this._conversationQuery.conversationId = this.chat.id;
    this._conversationQuery.unassigned = true;
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        await this.updateListAsync();
      });
    await this.updateListAsync();
  }

  public async onRemove(obj: ParticipantWrapper) {
    this.persons.add(obj);
    this.selectedPersons.remove(obj);
  }

  public async onSelect() {
    this.persons.remove(this.active);
    this.selectedPersons.add(this.active);
  }

  public async setActive(obj: ParticipantWrapper) {
    this.active = obj;
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async updateListAsync(from: number = 0) {
    this._conversationQuery.from = from;
    this._conversationQuery.name = this._searchText == undefined ? '' : this._searchText;
    const pageContainer = await this._participantRestApiService.getParticipants(this._conversationQuery);
    const list = pageContainer.list;
    if (from == 0) {
      this.persons.removeAll();
    }

    for (let i = 0; i < list.length; i++) {
      if (!this.selectedPersons.data
        .filter(participantWrapper => participantWrapper.participant.person === list[i].person).length) {
        this.persons.add(new ParticipantWrapper(list[i], this.person));
      }
    }
  }

  public async onSave() {
    if (this.selectedPersons.size() > 0) {
      const listRequest: ListRequest<IdRequest> = new ListRequest(this.selectedPersons.data.map(participantWrapper => new IdRequest(participantWrapper.id)));
      await this._participantRestApiService.updateParticipants(listRequest, {}, {conversationId: this.chat.id});
      this.modal.dismiss();
    }
  }

  private async getCurrentParticipants() {
    const query: ConversationQuery = new ConversationQuery();
    query.from = 0;
    query.count = PropertyConstant.pageSizeMax;
    query.unassigned = false;
    query.conversationId = this.chat.id;
    return (await this._participantRestApiService.getParticipants(query))
      .list
      .map(participant => new ParticipantWrapper(participant, this.person));
  }

}
