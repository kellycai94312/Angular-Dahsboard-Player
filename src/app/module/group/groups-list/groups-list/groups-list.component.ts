import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {GroupQuery} from '../../../../data/remote/rest-api/query/group-query';
import {Direction} from '../../../../components/ngx-virtual-scroll/model/direction';
import {PageQuery} from '../../../../data/remote/rest-api/page-query';
import {ParticipantRestApiService} from '../../../../data/remote/rest-api/participant-rest-api.service';
import {TranslateObjectService} from '../../../../shared/translate-object.service';
import {AppHelper} from '../../../../utils/app-helper';
import {NgxVirtualScrollComponent} from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import {PropertyConstant} from '../../../../data/local/property-constant';
import {Group} from '../../../../data/remote/model/group/base/group';
import {ItemDisplay} from '../../../common/item-list/model/item-display';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent)
  public ngxVirtualScrollComponent: NgxVirtualScrollComponent;

  @Input()
  public groupQuery: GroupQuery;

  @Input()
  public itemDisplay: ItemDisplay;

  public readonly itemDisplayClass = ItemDisplay;

  constructor(private _participantRestApiService: ParticipantRestApiService,
              private _translateObjectService: TranslateObjectService,
              private _router: Router,
              private _appHelper: AppHelper) {
    this.groupQuery = new GroupQuery();
    this.groupQuery.name = '';
    this.groupQuery.from = 0;
    this.groupQuery.count = PropertyConstant.pageSize;
  }

  async ngOnInit() {
    await this.updateItems();
  }

  public onClickByItem = async (item: Group) => {
    await this._router.navigate(['/group', item.id]);
  };

  public fetchItems = async (direction: Direction, query: PageQuery) => {
    return await this._participantRestApiService.getGroups(query);
  };

  public async updateItems() {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
