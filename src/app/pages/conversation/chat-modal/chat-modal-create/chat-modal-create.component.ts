import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HashSet} from '../../../../data/local/hash-set';
import {Person} from '../../../../data/remote/model/person';
import {DxTextBoxComponent} from 'devextreme-angular';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {AuthorizationService} from '../../../../shared/authorization.service';
import {PersonQuery} from '../../../../data/remote/rest-api/query/person-query';
import {IdRequest} from '../../../../data/remote/request/id-request';
import {ChatRequest} from '../../../../data/remote/request/chat-request';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal-create.component.html',
  styleUrls: ['./chat-modal-create.component.scss']
})
export class ChatModalCreateComponent implements OnInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;
  public chatName: string;
  public readonly persons: HashSet<Person>;
  public readonly selectedPersons: HashSet<Person>;
  public active: Person;

  private readonly _personQuery: PersonQuery;
  private _person: Person;
  private _searchText: string;

  constructor(public modal: NgbActiveModal,
              private _participantRestApiService: ParticipantRestApiService,
              private _authorizationService: AuthorizationService,
              private _router: Router) {
    this.persons = new HashSet<Person>();
    this.selectedPersons = new HashSet<Person>();
    this._personQuery = new PersonQuery();
  }

  async ngOnInit() {
    this._person = await this._authorizationService.getPerson();
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        await this.updateListAsync();
      });
    await this.updateListAsync();
  }

  public async onRemove(obj: Person) {
    this.persons.add(obj);
    this.selectedPersons.remove(obj);
  }

  public async onSelect() {
    this.persons.remove(this.active);
    this.selectedPersons.add(this.active);
  }

  public async setActive(obj: Person) {
    this.active = obj;
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async updateListAsync(from: number = 0) {
    this._personQuery.from = from;
    this._personQuery.name = this._searchText == undefined ? '' : this._searchText;
    const pageContainer = await this._participantRestApiService.getPersons(this._personQuery);
    const list = pageContainer.list;
    if (from == 0) {
      this.persons.removeAll();
    }

    for (let i = 0; i < list.length; i++) {
      if (!this.selectedPersons.contains(list[i]) && list[i].id != this._person.id) {
        this.persons.add(list[i]);
      }
    }
  }

  public async onSave(event: any) {
    const result = event.validationGroup.validate();
    if (result.isValid && this.selectedPersons.size() > 0) {
      const request = new ChatRequest();
      request.name = this.chatName;
      request.personIds = this.selectedPersons.data.map(person => new IdRequest(person.id));
      const chat = await this._participantRestApiService.createChat(request);
      await this._router.navigate(['/conversation', chat.id]);
      this.modal.dismiss();
    }
  }

}
