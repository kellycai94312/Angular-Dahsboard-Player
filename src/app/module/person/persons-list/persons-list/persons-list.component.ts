import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PersonQuery} from '../../../../data/remote/rest-api/query/person-query';
import {NameWrapper} from '../../../../data/local/name-wrapper';
import {SexEnum} from '../../../../data/remote/misc/sex-enum';
import {UserRole} from '../../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {AppHelper} from '../../../../utils/app-helper';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {Person} from '../../../../data/remote/model/person';
import {Router} from '@angular/router';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {

  public readonly propertyConstantClass = PropertyConstant;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public personQuery: PersonQuery;

  public sexEnums: NameWrapper<SexEnum>[];
  public userRoles: UserRole[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _router: Router,
              private _appHelper: AppHelper) {
    this.personQuery = new PersonQuery();
    this.personQuery.name = '';
    this.personQuery.from = 0;
    this.personQuery.count = this.propertyConstantClass.pageSize;
    this.userRoles = [];
  }

  async ngOnInit() {
    this.sexEnums = await this._translateObjectService.getTranslatedEnumCollection<SexEnum>(SexEnum, 'SexEnum');
    this.userRoles = await this._participantRestApiService.getUserRoles();
    await this.updateItems();
  }

  public onClickByItem = async (item: Person) => {
    await this._router.navigate(['/person', item.id]);
  };

  public fetchItems = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getPersons(query);
  };

  public async updateItems() {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
