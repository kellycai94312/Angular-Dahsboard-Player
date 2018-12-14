import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
import {ClientError} from '../../../../data/local/error/client-error';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal-create.component.html',
  styleUrls: ['./chat-modal-create.component.scss']
})
export class ChatModalCreateComponent implements OnInit {

  @Input()
  public selectedPerson: Person;
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
    if (this.selectedPerson) {
      this.selectedItems.push(this.selectedPerson);
    }
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

    await this.onAfterUpdateItems();
  }

  public async onUnselect(item: Person) {
    this._appHelper.removeItem(this.selectedItems, item);
    this.itemsNgxVirtualScrollComponent.items.push(item);
  }

  public async onAfterUpdateItems() {
    if (this.itemsNgxVirtualScrollComponent.items.length < PropertyConstant.pageSize && this.itemsNgxVirtualScrollComponent.canScrollDown()) {
      await this.itemsNgxVirtualScrollComponent.onScrollDown();
    }
  }

  public async setActive(obj: Person) {
    this.active = obj;
  }

  public getUnselectedItems: Function = async (direction: Direction, pageQuery: ConversationQuery) => {
    pageQuery.unassigned = true;
    const pageContainer = await this._participantRestApiService.getParticipants(pageQuery);
    return this._appHelper.pageContainerConverter(pageContainer,
      participant => participant.person,
      person => person.id != this._person.id
    );
  };

  public onSave = async () => {
    await this._appHelper.trySave(async () => {
      if (this.selectedItems.length > 0) {
        const request = new ChatRequest();
        request.name = this.chatName;
        request.personIds = this.selectedItems.map(person => new IdRequest(person.id));
        const chat = await this._participantRestApiService.createChat(request);

        // Reload children when on the same state /conversation/:id
        if (this._router.url.indexOf('/conversation/') == 0) {
          await this._router.navigate(['/conversation']);
        }

        await this._router.navigate(['/conversation', chat.id]);
        this.modal.dismiss();
      } else {
        throw new ClientError('chatMustContainOneParticipant');
      }
    });
  };

  private async updateItems() {
    await this.itemsNgxVirtualScrollComponent.reset();
  }

}
