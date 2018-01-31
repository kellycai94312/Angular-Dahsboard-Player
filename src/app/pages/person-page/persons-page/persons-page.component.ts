import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ParticipantRestApiService} from '../../../data/remote/rest-api/participant-rest-api.service';
import {DxTextBoxComponent} from 'devextreme-angular';
import {GroupQuery} from '../../../data/remote/rest-api/query/group-query';
import {PropertyConstant} from '../../../data/local/property-constant';
import {PageQuery} from '../../../data/remote/rest-api/page-query';
import {PersonQuery} from '../../../data/remote/rest-api/query/person-query';
import {PersonViewModel} from '../../../data/local/view-model/person-view-model';

@Component({
  selector: 'app-persons-page',
  templateUrl: './persons-page.component.html',
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  public personViewModels: PersonViewModel[];

  private _searchText: string;
  private readonly _personQuery: PersonQuery;

  constructor(private _participantRestApiService: ParticipantRestApiService) {
    this.personViewModels = [];
    this._searchText = '';

    this._personQuery = new GroupQuery();
    this._personQuery.from = 0;
    this._personQuery.count = PropertyConstant.pageSize;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this._searchText = value;
        await this.updateListAsync();
      });
  }

  public async onNextPage(pageQuery: PageQuery) {
    await this.updateListAsync(pageQuery.from);
  }

  public async updateListAsync(from: number = 0) {
    this._personQuery.from = from;
    this._personQuery.fullName = this._searchText;

    const pageContainer = await this._participantRestApiService.getPersons(this._personQuery);
    for (const person of pageContainer.list) {
      // TODO: Get base user role
      const baseGroupPerson = await this._participantRestApiService.getBaseGroup({
        id: person.id,
        userRoleId: 10
      });

      this.personViewModels.push(new PersonViewModel(person, baseGroupPerson.group, this._participantRestApiService));
    }
  }
}
