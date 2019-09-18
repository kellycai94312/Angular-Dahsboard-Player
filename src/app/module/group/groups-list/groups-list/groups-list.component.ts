import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Direction } from '../../../../components/ngx-virtual-scroll/model/direction';
import { NgxVirtualScrollComponent } from '../../../../components/ngx-virtual-scroll/ngx-virtual-scroll/ngx-virtual-scroll.component';
import { PropertyConstant } from '../../../../data/local/property-constant';
import { PageQuery } from '../../../../data/remote/rest-api/page-query';
import { ParticipantRestApiService } from '../../../../data/remote/rest-api/participant-rest-api.service';
import { GroupQuery } from '../../../../data/remote/rest-api/query/group-query';
import { TranslateObjectService } from '../../../../shared/translate-object.service';
import { AppHelper } from '../../../../utils/app-helper';
import { ItemDisplay } from '../../../common/item-list/model/item-display';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {

  @ViewChild(NgxVirtualScrollComponent, { static: false })
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

  public async ngOnInit(): Promise<void> {
    await this.updateItems();
  }

  public fetchItems = async (direction: Direction, query: PageQuery) => {
    return this._participantRestApiService.getGroups(query);
  };

  public async updateItems(): Promise<void> {
    await this._appHelper.delay();
    await this.ngxVirtualScrollComponent.reset();
  }

}
