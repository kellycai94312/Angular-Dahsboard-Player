import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Person} from '../../../../data/remote/model/person';
import {DxTextBoxComponent} from 'devextreme-angular';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {PersonQuery} from '../../../../data/remote/rest-api/query/person-query';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {ChatRequest} from '../../../../data/remote/request/chat-request';
import {Router} from '@angular/router';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {AppHelper} from '../../../../utils/app-helper';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {ConversationQuery} from '../../../../data/remote/rest-api/query/conversation-query';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal-create.component.html',
  styleUrls: ['./chat-modal-create.component.scss']
})
export class ChatModalCreateComponent implements OnInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;
  @ViewChild('itemsNgxVirtualScrollComponent')
  public itemsNgxVirtualScrollComponent: NgxVirtualScrollComponent;
  public selectedItems: Person[];
  public chatName: string;
  public active: Person;
  public readonly personQuery: PersonQuery;

  private _person: Person;

  constructor(public modal: NgbActiveModal,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _router: Router,
              private _appHelper: AppHelper) {
    this.personQuery = new PersonQuery();
    this.selectedItems = [];
  }

  async ngOnInit() {
    this._person = await this._authorizationService.getPerson();
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.personQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  public async onSelect(item: Person) {
    this._appHelper.removeItem(this.itemsNgxVirtualScrollComponent.items, item);
    this.selectedItems.push(item);
  }

  public async onUnselect(item: Person) {
    this._appHelper.removeItem(this.selectedItems, item);
    this.itemsNgxVirtualScrollComponent.items.push(item);
  }

  public async setActive(obj: Person) {
    this.active = obj;
  }

  public getUnselectedPersons: Function = async (direction: Direction, pageQuery: ConversationQuery) => {
    pageQuery.unassigned = true;
    const pageContainer = await this._participantRestApiService.getPersons(pageQuery);
    return this._appHelper.pageContainerConverter(pageContainer,
      person => person,
      person => person.id != this._person.id
    );
  };

  public async onSave(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid && this.selectedItems.length) {
      const request = new ChatRequest();
      request.name = this.chatName;
      request.personIds = this.selectedItems.map(person => new IdRequest(person.id));
      const chat = await this._participantRestApiService.createChat(request);
      await this._router.navigate(['/conversation', chat.id]);
      this.modal.dismiss();
    }
  }

  private async updateItems() {
    await this.itemsNgxVirtualScrollComponent.reset();
  }

}
