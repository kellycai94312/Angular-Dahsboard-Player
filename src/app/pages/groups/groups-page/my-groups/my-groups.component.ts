import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GroupType} from '../../../../data/remote/model/group/base/group-type';
import {UserRole} from '../../../../data/remote/model/user-role';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {DxTextBoxComponent} from 'devextreme-angular';
import {GroupViewModel} from '../../../../data/local/view-model/group/group-view-model';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {AppHelper} from '../../../../utils/app-helper';

@Component({
  selector: 'app-my-groups',
  templateUrl: './my-groups.component.html',
  styleUrls: ['./my-groups.component.scss']
})
export class MyGroupsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchDxTextBoxComponent')
  public searchDxTextBoxComponent: DxTextBoxComponent;

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  public groupQuery: GroupQuery;

  public groupTypes: GroupType[];
  public userRoles: UserRole[];

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _appHelper: AppHelper) {
    this.groupQuery = new GroupQuery();
    this.groupQuery.name = '';
    this.groupQuery.from = 0;
    this.groupQuery.count = PropertyConstant.pageSize;
    this.groupQuery.all = false;
  }

  async ngOnInit() {
    this.groupTypes = await this._participantRestApiService.getGroupTypes();
    this.userRoles = await this._participantRestApiService.getUserRoles();
  }

  async ngAfterViewInit() {
    this.searchDxTextBoxComponent.textChange.debounceTime(PropertyConstant.searchDebounceTime)
      .subscribe(async value => {
        this.groupQuery.name = value;
        await this.updateItems();
      });
    await this.updateItems();
  }

  public async onGroupTypeChanged(value: GroupType) {
    if (value != null) {
      this.groupQuery.groupTypeId = value.id;
    } else {
      delete this.groupQuery.groupTypeId;
    }
    await this.updateItems();
  }

  public async onUserRoleChanged(value: UserRole) {
    if (value != null) {
      this.groupQuery.userRoleId = value.id;
    } else {
      delete this.groupQuery.userRoleId;
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
