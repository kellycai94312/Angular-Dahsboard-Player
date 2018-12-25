import {debounceTime} from 'rxjs/operators/debounceTime';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserRole} from '../../../../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../../../data/local/property-constant';
import {PageQuery} from '../../../../../../data/remote/rest-api/page-query';
import {GroupQuery} from '../../../../../../data/remote/rest-api/query/group-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import {GroupViewModel} from '../../../../../../data/local/view-model/group/group-view-model';
import {NgxVirtualScrollComponent} from '../../../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../../../components/ngx-virtual-scroll/model/direction';
import {AppHelper} from '../../../../../../utils/app-helper';
import {GroupTypeEnum} from '../../../../../../data/remote/model/group/base/group-type-enum';
import {NameWrapper} from '../../../../../../data/local/name-wrapper';
import {TranslateObjectService} from '../../../../../../shared/translate-object.service';

@Component({
  selector: 'app-my-groups-page',
  templateUrl: './my-groups-page.component.html',
  styleUrls: ['./my-groups-page.component.scss']
})
export class MyGroupsPageComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public groupQuery: GroupQuery;

  public groupTypeEnums: NameWrapper<GroupTypeEnum>[];
  public userRoles: UserRole[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper,
              private _translateObjectService: TranslateObjectService) {
    this.groupQuery = new GroupQuery();
    this.groupQuery.name = '';
    this.groupQuery.from = 0;
    this.groupQuery.count = PropertyConstant.pageSize;
    this.groupQuery.all = false;
  }

  async ngOnInit() {
    this.groupTypeEnums = await this._translateObjectService.getTranslatedEnumCollection<GroupTypeEnum>(GroupTypeEnum, 'GroupTypeEnum');
    this.userRoles = await this._participantRestApiService.getUserRoles();
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.pipe(debounceTime(PropertyConstant.searchDebounceTime))
      .subscribe(async value => {
        this.groupQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  public async onGroupTypeChanged(val: NameWrapper<GroupTypeEnum>) {
    if (val) {
      this.groupQuery.groupTypeEnum = val.data;
    } else {
      delete this.groupQuery.groupTypeEnum;
    }
    await this.updateItems();
  }

  public async onUserRoleChanged(val: UserRole) {
    if (val) {
      this.groupQuery.userRoleEnum = val.userRoleEnum;
    } else {
      delete this.groupQuery.userRoleEnum;
    }
    await this.updateItems();
  }

  public getItems: Function = async (direction: Direction, pageQuery: PageQuery) => {
    const pageContainer = await this._participantRestApiService.getGroups(pageQuery);
    return await this._appHelper.pageContainerConverter(pageContainer, async original => {
      const groupViewModel = new GroupViewModel(original);
      await groupViewModel.initialize();
      return groupViewModel;
    });
  };

  private async updateItems() {
    await this.ngxVirtualScrollComponent.reset();
  }

}
