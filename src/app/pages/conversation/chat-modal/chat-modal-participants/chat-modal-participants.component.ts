import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../../../../data/remote/model/chat/conversation/chat';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../../../data/remote/model/person';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {ConversationQuery} from '../../../../data/remote/rest-api/query/conversation-query';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {ParticipantWrapper} from './participant-wrapper';
import {DxTextBoxComponent} from 'devextreme-angular';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {ListRequest} from '../../../../data/remote/request/list-request';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AppHelper} from '../../../../utils/app-helper';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';

@Component({
  selector: 'app-chat-modal-add-participants',
  templateUrl: './chat-modal-participants.component.html',
  styleUrls: ['./chat-modal-participants.component.scss']
})
export class ChatModalParticipantsComponent implements OnInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;
  @ViewChild('unselectedItemsNgxVirtualScrollComponent')
  public unselectedItemsNgxVirtualScrollComponent: NgxVirtualScrollComponent;
  @ViewChild('selectedItemsNgxVirtualScrollComponent')
  public selectedItemsNgxVirtualScrollComponent: NgxVirtualScrollComponent;
  @Input()
  public chat: Chat;
  public active: ParticipantWrapper;
  public person: Person;
  public conversationQuery: ConversationQuery;

  constructor(public modal: NgbActiveModal,
              private _authorizationService: AuthorizationService,
              private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.conversationQuery = new ConversationQuery();
  }

  async ngOnInit() {
    this.person = await this._authorizationService.getPerson();
    this.conversationQuery.conversationId = this.chat.id;
    this.conversationQuery.unassigned = true;
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.conversationQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
    await this.selectedItemsNgxVirtualScrollComponent.reset();
  }

  public async onSelect(item: ParticipantWrapper) {
    this._appHelper.removeItem(this.unselectedItemsNgxVirtualScrollComponent.items, item);
    this.selectedItemsNgxVirtualScrollComponent.items.push(item);
  }

  public async onUnselect(item: ParticipantWrapper) {
    this._appHelper.removeItem(this.selectedItemsNgxVirtualScrollComponent.items, item);
    this.unselectedItemsNgxVirtualScrollComponent.items.push(item);
  }

  public async setActive(obj: ParticipantWrapper) {
    this.active = obj;
  }

  public getUnselectedItems: Function = async (direction: Direction, pageQuery: ConversationQuery) => {
    pageQuery.unassigned = true;
    const pageContainer = await this._participantRestApiService.getParticipants(pageQuery);
    return this._appHelper.pageContainerConverter(pageContainer, original => {
      return new ParticipantWrapper(original, this.person);
    });
  };

  public getSelectedItems: Function = async (direction: Direction, pageQuery: ConversationQuery) => {
    pageQuery.unassigned = false;
    pageQuery.conversationId = this.chat.id;
    const pageContainer = await this._participantRestApiService.getParticipants(pageQuery);
    return this._appHelper.pageContainerConverter(pageContainer, original => {
      return new ParticipantWrapper(original, this.person);
    });
  };

  public async onSave() {
    if (this.selectedItemsNgxVirtualScrollComponent.items.length > 0) {
      const listRequest: ListRequest<IdRequest> = new ListRequest(this.selectedItemsNgxVirtualScrollComponent.items.map(participantWrapper => new IdRequest(participantWrapper.id)));
      await this._participantRestApiService.updateParticipants(listRequest, {}, {conversationId: this.chat.id});
      this.modal.dismiss();
    }
  }

  private async updateItems() {
    await this.unselectedItemsNgxVirtualScrollComponent.reset();
  }

}
